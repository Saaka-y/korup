
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.exceptions import ValidationError
from datetime import timedelta
from account.models import Student, Tutor


# プラン情報
class Plan(models.Model):
    plan_id = models.CharField(max_length=10, unique=True)  # 例: P01
    name = models.CharField(max_length=100)     # 例: マイペース（8週間フレックス）
    base_fee_bank = models.IntegerField(null=True, blank=True)  # ベース料金_振込（税込）
    base_max_weeks = models.IntegerField(null=True, blank=True) # ベース最大期間_週
    lessons = models.IntegerField(null=True, blank=True)  # Saakaレッスン数
    conversation_classes = models.IntegerField(null=True, blank=True)  # Conversation Class数
    ten_talk = models.CharField(max_length=50, blank=True)  # Ten Talk
    correction_frequency = models.CharField(max_length=50, blank=True) # 添削頻度
    base_fee_card = models.IntegerField(null=True, blank=True)  # クレカ料金（税込・自動）
    fee_3m_bank = models.IntegerField(null=True, blank=True)    # 3ヶ月_振込（税込・自動）
    fee_3m_card = models.IntegerField(null=True, blank=True)    # 3ヶ月_クレカ（税込・自動）
    fee_6m_bank = models.IntegerField(null=True, blank=True)    # 6ヶ月_振込（税込・自動）
    fee_6m_card = models.IntegerField(null=True, blank=True)    # 6ヶ月_クレカ（税込・自動）

    def __str__(self):
        return f"{self.plan_id} - {self.name}"


class Transaction(models.Model):
    student = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True, blank=True, related_name='transactions')
    plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, null=True, blank=True)
    
    # 入金情報
    payment_date = models.DateField(null=True, blank=True)
    
    PAYMENT_METHOD = [
        ('bank_transfer', '振込'),
        ('credit_card', 'クレカ'),
    ]
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD, blank=True)
    
    # レッスン情報
    lesson_amount = models.IntegerField(null=True, blank=True)
    period_start_date = models.DateField(null=True, blank=True)
    period_end_date = models.DateField(null=True, blank=True)
    
    # ステータス
    STATUS_CHOICES = [
        ('completed', '終了'),
        ('ongoing', '受講中'),
        ('not_consumed', '未消化'),
        ('suspended', '保留'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ongoing')
    
    # その他
    is_conversation_class_included = models.BooleanField(default=False)
    receipt_issued = models.BooleanField(default=False)
    notes = models.TextField(blank=True)

    def save(self, *args, **kwargs):
        # planが設定されている場合、プラン情報を自動セット
        if self.plan:
            if not self.lesson_amount:
                self.lesson_amount = self.plan.lessons
            
            # period_start_dateが設定されていて、period_end_dateが未設定の場合
            if self.period_start_date and not self.period_end_date and self.plan.base_max_weeks:
                # base_max_weeks分の日数を加算
                days = self.plan.base_max_weeks * 7
                self.period_end_date = self.period_start_date + timedelta(days=days)
        
        super().save(*args, **kwargs)

    @property
    def completed_lessons(self):
        """完了したレッスン数を計算"""
        return self.lesson_statuses.filter(status='completed').count()

    @property
    def remaining_lessons(self):
        """このトランザクション内の残レッスン数を計算"""
        total = self.lesson_amount or 0
        return max(total - self.completed_lessons, 0)
    
    def __str__(self):
        plan_name = self.plan.name if self.plan else 'N/A'
        return f"{self.student} - {plan_name} - {self.period_start_date}"


class LessonStatus(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='lesson_statuses')
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name='lesson_statuses', null=True, blank=True)
    next_lesson_date = models.DateTimeField()
    is_conversation_class = models.BooleanField(default=False)

    STATS = [
        ('reserved', '予約済み'),
        ('completed', '完了'),
        ('canceled', 'キャンセル'),
    ]

    status = models.CharField(max_length=20, choices=STATS, default='reserved')
    link = models.URLField(max_length=200, blank=True, null=True)

    @property
    def number_of_completed(self):
        # 同じトランザクション内で完了したレッスン数
        if self.transaction:
            return self.transaction.lesson_statuses.filter(status='completed').count()
        return 0

    @property
    def remaining_lessons(self):
        # Transactionからの残レッスン数を利用
        if self.transaction:
            return self.transaction.remaining_lessons
        return 0

    def __str__(self):
        local_time = timezone.localtime(self.next_lesson_date)
        return f"{self.student} - {local_time.strftime('%Y-%m-%d %H:%M:%S')} - Completed: {self.number_of_completed} - Remaining: {self.remaining_lessons}"


class Schedule(models.Model):
    """コーチ（Coach）側の通常レッスン予約スロット"""
    coach = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='schedules')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    meeting_url = models.URLField(max_length=200, blank=True, null=True)
    is_available = models.BooleanField(default=True)
    lesson_status = models.ForeignKey(LessonStatus, on_delete=models.SET_NULL, null=True, blank=True, related_name='schedule')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['coach', 'start_time'], name='unique_schedule_coach_start_time'),
        ]

    def clean(self):
        if not self.start_time or not self.end_time:
            return

        if self.end_time <= self.start_time:
            raise ValidationError('end_time は start_time より後である必要があります。')

        duration = self.end_time - self.start_time
        if duration != timedelta(hours=1):
            raise ValidationError('レッスン時間は60分固定です。')

    def save(self, *args, **kwargs):
        if self.start_time and not self.end_time:
            self.end_time = self.start_time + timedelta(hours=1)
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Schedule - {self.coach} - {self.start_time.strftime('%Y-%m-%d %H:%M')}"


class TutorSchedule(models.Model):
    """チューター側のConversation Class予約スロット"""
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE, related_name='tutor_schedules')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    zoom_url = models.URLField(max_length=200, blank=True, null=True)
    is_available = models.BooleanField(default=True)
    lesson_status = models.ForeignKey(LessonStatus, on_delete=models.SET_NULL, null=True, blank=True, related_name='tutor_schedule')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['tutor', 'start_time'], name='unique_tutor_schedule_tutor_start_time'),
        ]

    def clean(self):
        if not self.start_time or not self.end_time:
            return

        if self.end_time <= self.start_time:
            raise ValidationError('end_time は start_time より後である必要があります。')

        duration = self.end_time - self.start_time
        if duration != timedelta(hours=1):
            raise ValidationError('レッスン時間は60分固定です。')

    def save(self, *args, **kwargs):
        if self.start_time and not self.end_time:
            self.end_time = self.start_time + timedelta(hours=1)
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"TutorSchedule - {self.tutor} - {self.start_time.strftime('%Y-%m-%d %H:%M')}"


class TenTalk(models.Model):
    """TenTalk（外部サービス）の予約情報"""
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='ten_talks')
    transaction = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True, blank=True)
    scheduled_date = models.DateTimeField()
    zoom_url = models.URLField(max_length=200, blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"TenTalk - {self.student} - {self.scheduled_date.strftime('%Y-%m-%d %H:%M')}"


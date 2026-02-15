
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from account.models import Student


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





# 予約情報

# ユーザーごと・プランごとの残レッスン数を取得するメソッドをUserに追加
from django.db.models import Q

def get_remaining_lessons(self, plan):
    total = plan.lessons or 0
    completed = self.lesson_statuses.filter(plan=plan, is_completed=True).count()
    return max(total - completed, 0)

Student.add_to_class('get_remaining_lessons', get_remaining_lessons)

class LessonStatus(models.Model):
    user = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='lesson_statuses')
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE, related_name='lesson_statuses', null=True, blank=True)
    next_lesson_date = models.DateTimeField()
    is_conversation_class = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)
    link = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self):
        local_time = timezone.localtime(self.next_lesson_date)
        return f"{self.user.username} - {local_time.strftime('%Y-%m-%d %H:%M:%S')} - Completed: {self.number_of_completed} - Remaining: {self.remaining_lessons}"


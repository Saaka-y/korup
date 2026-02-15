from django.db import models

# クールごとのレポートを保存

class Report(models.Model):
    student = models.ForeignKey('account.Student', on_delete=models.CASCADE, related_name='reports')
    report_number = models.PositiveIntegerField(default=1, help_text='何回目のレポートか（例: 1回目、2回目...）')
    created_at = models.DateField(auto_now_add=True)

    
    # メッセージ
    message = models.TextField(help_text='コーチからのメッセージ')
    tutor_message = models.TextField(help_text='チューターからのメッセージ')
    
    # スキル別コメント（空欄可）
    speaking_field = models.TextField(blank=True, default='', help_text='スピーキング')
    listening_field = models.TextField(blank=True, default='', help_text='リスニング')
    grammar_field = models.TextField(blank=True, default='', help_text='文法')
    vocabulary_field = models.TextField(blank=True, default='', help_text='語彙')
    pronunciation_field = models.TextField(blank=True, default='', help_text='発音')
    
    # 目標と達成度
    goal = models.TextField(help_text='次回の目標')
    
    ACHIEVEMENT_CHOICES = [
        ('not_started', '未着手'),
        ('in_progress', '途中'),
        ('achieved', '達成'),
    ]
    achievement_level = models.CharField(
        max_length=20, 
        choices=ACHIEVEMENT_CHOICES, 
        default='not_started',
        help_text='前回目標の達成度'
    )
    
    # 目標達成のためにやること
    action_item_1 = models.CharField(max_length=200, help_text='アクション1')
    action_item_2 = models.CharField(max_length=200, blank=True, default='', help_text='アクション2')
    
    # レコーディングURL（1ヶ月で削除）
    recording_url = models.URLField(blank=True, null=True, help_text='レコーディングURL')
    
    # メタ情報
    updated_at = models.DateTimeField(auto_now=True)
    is_sent = models.BooleanField(default=False, help_text='生徒に送信済み')
    
    class Meta:
        ordering = ['-created_at']
        unique_together = [['student', 'report_number']]  # 同じ生徒に同じレポート番号は不可

    def __str__(self):
        return f"{self.student.user.username} - {self.created_at}"
    

# 日々の使用教材やクールごとのレポートを保存
# class Trajectory(models.Model):
#     student = models.ForeignKey('account.Student', on_delete=models.CASCADE)
    




    

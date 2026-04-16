from django.db import models

# クールごとのレポートを保存

class Report(models.Model):
    student = models.ForeignKey('account.Student', on_delete=models.CASCADE, related_name='reports')
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
    
    # ハイライト
    highlights = models.TextField(help_text='レポートのハイライト')
    
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

    def __str__(self):
        return f"{self.student.user.username} - {self.created_at}"
    

# 日々の使用教材やクールごとのレポートを保存
# class Trajectory(models.Model):
#     student = models.ForeignKey('account.Student', on_delete=models.CASCADE)
    




    

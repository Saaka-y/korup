from django.db import models
from django.db.models import Q


class ActionPlan(models.Model):
    student = models.ForeignKey(
        "account.Student",
        on_delete=models.CASCADE,
        related_name="action_plans",
    )
    created_at = models.DateField(auto_now_add=True)

    # 最終目標（シートの最上位セクション）
    final_goal = models.CharField(max_length=200, help_text="最終目標")
    final_goal_due = models.DateField(help_text="最終目標の期限")
    overall_advice = models.TextField(
        blank=True,
        default="1時間のSNSより、30分の自己学習を！",
        help_text="全体の意識付け・アドバイス",
    )

    class Meta:
        ordering = ["-created_at", "-id"]

    def __str__(self):
        user = self.student.user
        display_name = user.get_full_name() or user.username
        return f"ActionPlan | {self.student.student_number} | {display_name} | due={self.final_goal_due}"

    def get_all_actions(self):
        """最終目標直下とマイルストーン配下のActionをまとめて返す。"""
        return Action.objects.filter(
            Q(action_plan=self) | Q(milestone__action_plan=self)
        ).select_related("milestone")


class Milestone(models.Model):
    """1ヶ月後、2ヶ月後、3ヶ月後、半年後などのマイルストーン"""

    action_plan = models.ForeignKey(
        ActionPlan,
        on_delete=models.CASCADE,
        related_name="milestones",
    )
    label = models.CharField(max_length=50, help_text="「1ヶ月後」など")
    due_date = models.DateField(help_text="目標期限")
    goal_description = models.TextField(help_text="目標の内容")
    self_study_note = models.TextField(blank=True, default="シャドーイング、音読、ボキャブラリー（キー動詞、Ultimate Expressions）", help_text="自己学習の内容要約")
    ADVICE_CHOICES = [
        ("no_script", "会話のキャッチボールは「感情」を乗せることが鍵。台本を読んでるみたいにならないように！"),
        ("expose_yourself", "細かいニュアンスはリアルな英語に触れることが大切。常に自分を英語の世界にexposeしていきましょう！"),
        ("set_alarm", "リスニングはシャドーイングが鍵！サボらないように、毎日やる時間を決めてコツコツ続けましょう！"),
        ("starter", "最初は習慣化が難しい、、、。ここで踏ん張って、後の自分に楽をさせてあげましょう！"),
    ]
    advice = models.CharField(max_length=200, choices=ADVICE_CHOICES, default="starter", help_text="講師からのアドバイス")
    order = models.PositiveIntegerField(default=1, help_text="表示順")

    class Meta:
        ordering = ["order", "id"]
        constraints = [
            models.UniqueConstraint(
                fields=["action_plan", "order"],
                name="uq_milestone_order_per_plan",
            )
        ]

    def __str__(self):
        user = self.action_plan.student.user
        display_name = user.get_full_name() or user.username
        student_number = self.action_plan.student.student_number
        return f"Milestone | {student_number} | {display_name} | {self.label}"


class Action(models.Model):
    """最終目標またはマイルストーンに紐づくアクション"""

    action_plan = models.ForeignKey(
        ActionPlan,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="final_actions",
    )
    milestone = models.ForeignKey(
        Milestone,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="actions",
    )
    content = models.CharField(max_length=200)
    is_important = models.BooleanField(default=False, help_text="「重要」フラグ")

    class Meta:
        constraints = [
            # final_actions と milestone.actions のどちらか一方だけを許可。
            models.CheckConstraint(
                condition=(
                    (Q(action_plan__isnull=False) & Q(milestone__isnull=True))
                    | (Q(action_plan__isnull=True) & Q(milestone__isnull=False))
                ),
                name="ck_action_exactly_one_parent",
            ),
        ]

    def __str__(self):
        parent = f"plan={self.action_plan_id}" if self.action_plan_id else f"milestone={self.milestone_id}"
        return f"Action({parent})"



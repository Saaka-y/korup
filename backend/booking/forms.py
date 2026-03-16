from datetime import timedelta

from django import forms

from .models import Plan, Transaction


class PlanSelect(forms.Select):
    def create_option(
        self,
        name,
        value,
        label,
        selected,
        index,
        subindex=None,
        attrs=None,
    ):
        option = super().create_option(
            name,
            value,
            label,
            selected,
            index,
            subindex=subindex,
            attrs=attrs,
        )

        plan = getattr(value, "instance", None)
        if isinstance(plan, Plan):
            option["attrs"].update(
                {
                    "data-plan-number": plan.plan_number or "",
                    "data-plan-name": plan.name or "",
                    "data-base-fee-bank": "" if plan.base_fee_bank is None else str(plan.base_fee_bank),
                    "data-base-fee-card": "" if plan.base_fee_card is None else str(plan.base_fee_card),
                    "data-lessons": "" if plan.lessons is None else str(plan.lessons),
                    "data-conversation-classes": "" if plan.conversation_classes is None else str(plan.conversation_classes),
                    "data-ten-talk": plan.ten_talk or "",
                    "data-correction-frequency": plan.correction_frequency or "",
                    "data-max-weeks": "" if plan.base_max_weeks is None else str(plan.base_max_weeks),
                }
            )

        return option


class TransactionAdminForm(forms.ModelForm):
    def clean(self):
        cleaned_data = super().clean()
        plan = cleaned_data.get("plan")
        period_start_date = cleaned_data.get("period_start_date")
        period_end_date = cleaned_data.get("period_end_date")
        max_weeks_snapshot = cleaned_data.get("max_weeks_snapshot")

        if max_weeks_snapshot is None and plan:
            max_weeks_snapshot = plan.base_max_weeks
            cleaned_data["max_weeks_snapshot"] = max_weeks_snapshot

        if period_start_date and not period_end_date and max_weeks_snapshot:
            cleaned_data["period_end_date"] = period_start_date + timedelta(days=max_weeks_snapshot * 7)

        return cleaned_data

    class Meta:
        model = Transaction
        fields = "__all__"
        widgets = {
            "plan": PlanSelect,
        }
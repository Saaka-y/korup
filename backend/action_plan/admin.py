from django.contrib import admin
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from django.template.response import TemplateResponse
from django.urls import path, reverse
from django.utils.html import format_html

from .models import ActionPlan, Milestone, Action


class FinalActionInline(admin.TabularInline):
    model = Action
    fk_name = "action_plan"
    extra = 0
    fields = ("content", "is_important")


class MilestoneInline(admin.StackedInline):
    model = Milestone
    extra = 0
    fields = (
        "order",
        "label",
        "due_date",
        "goal_description",
        "self_study_note",
        "advice",
    )
    ordering = ("order", "id")


class MilestoneActionInline(admin.TabularInline):
    model = Action
    fk_name = "milestone"
    extra = 0
    fields = ("content", "is_important")
    

@admin.register(ActionPlan)
class ActionPlanAdmin(admin.ModelAdmin):
    list_display = ("student", "final_goal_due", "created_at", "overview_link")
    list_filter = ("student",)
    search_fields = (
        "student__user__username",
        "student__user__first_name",
        "student__user__last_name",
        "final_goal",
    )
    date_hierarchy = "created_at"
    ordering = ("-created_at", "-id")
    autocomplete_fields = ("student",)
    inlines = [FinalActionInline, MilestoneInline]
    fieldsets = (
        ("基本情報", {"fields": ("student", "final_goal", "final_goal_due")}),
        ("全体メモ", {"fields": ("overall_advice",)}),
    )

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "<path:object_id>/overview/",
                self.admin_site.admin_view(self.overview_view),
                name="action_plan_actionplan_overview",
            ),
        ]
        return custom_urls + urls

    @admin.display(description="詳細")
    def overview_link(self, obj):
        url = reverse("admin:action_plan_actionplan_overview", args=[obj.pk])
        return format_html('<a class="button" href="{}">check</a>', url)

    def overview_view(self, request, object_id):
        obj = get_object_or_404(
            ActionPlan.objects.select_related("student__user"),
            pk=object_id,
        )

        if not self.has_view_or_change_permission(request, obj):
            raise PermissionDenied

        final_actions = obj.final_actions.all().order_by("id")
        milestones = obj.milestones.prefetch_related("actions").order_by("order", "id")

        context = {
            **self.admin_site.each_context(request),
            "opts": self.model._meta,
            "original": obj,
            "title": f"ActionPlan詳細: {obj}",
            "action_plan": obj,
            "final_actions": final_actions,
            "milestones": milestones,
            "change_url": reverse(
                "admin:action_plan_actionplan_change",
                args=[obj.pk],
            ),
        }
        return TemplateResponse(
            request,
            "admin/action_plan/actionplan/overview.html",
            context,
        )

@admin.register(Milestone)
class MilestoneAdmin(admin.ModelAdmin):
    list_display = ("label", "student_name", "due_date", "order")
    list_filter = ("action_plan",)
    search_fields = ("action_plan__final_goal", "label")
    date_hierarchy = "due_date"
    ordering = ("action_plan", "order", "id")
    autocomplete_fields = ("action_plan",)
    inlines = [MilestoneActionInline]
    fieldsets = (
        ("紐づけ", {"fields": ("action_plan",)}),
        ("目標情報", {"fields": ("order", "label", "due_date", "goal_description")}),
        ("補足", {"fields": ("self_study_note", "advice")}),
    )

    @admin.display(description="生徒名")
    def student_name(self, obj):
        user = obj.action_plan.student.user
        return user.get_full_name() or user.username
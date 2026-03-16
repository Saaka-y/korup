from django.contrib import admin

from .forms import TransactionAdminForm
from .models import LessonStatus, Plan, Transaction, Schedule, TutorSchedule

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('plan_number', 'name', 'base_fee_bank', 'lessons', 'conversation_classes')
    search_fields = ('plan_number', 'name')
    ordering = ('plan_number',)

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    form = TransactionAdminForm
    list_display = ('student', 'created_at','display_plan_name', 'period_end_date', 'display_remaining_lessons', 'status')
    list_filter = ('plan', 'status')
    search_fields = ('student__user__username', 'plan__plan_number', 'plan_number_snapshot', 'plan_name_snapshot')
    
    fieldsets = (
        ('基本情報', {
            'fields': ('student', 'plan')
        }),
        ('契約内容', {
            'fields': (
                'plan_number_snapshot',
                'plan_name_snapshot',
                'price_snapshot',
                'lesson_amount',
                'conversation_class_amount',
                'ten_talk_snapshot',
                'correction_frequency_snapshot',
                'max_weeks_snapshot',
            )
        }),
        ('支払い情報', {
            'fields': ('payment_date', 'payment_method', 'status')
        }),
        ('レッスン情報', {
            'fields': ('period_start_date', 'period_end_date', 'is_conversation_class_completed')
        }),
        ('その他', {
            'fields': ('receipt_issued', 'notes')
        }),
    )
    
    def get_readonly_fields(self, request, obj=None):
        # 契約作成後は元テンプレートの付け替えを避ける
        if obj:
            return ('plan',)
        return ()

    def display_plan_name(self, obj):
        return obj.plan_name_snapshot or obj.plan
    display_plan_name.short_description = 'プラン名'
    
    def display_remaining_lessons(self, obj):
        return obj.remaining_lessons
    display_remaining_lessons.short_description = '残レッスン数'

    class Media:
        js = ('booking/admin/transaction_form.js',)

@admin.register(LessonStatus)
class LessonStatusAdmin(admin.ModelAdmin):
    list_display = ('student', 'next_lesson_date', 'status', 'is_conversation_class', 'link')
    list_filter = ('status', 'is_conversation_class')
    search_fields = ('student__username',)

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('coach', 'start_time', 'end_time', 'is_available')
    list_filter = ('is_available',)
    search_fields = ('coach__username',)


@admin.register(TutorSchedule)
class TutorScheduleAdmin(admin.ModelAdmin):
    list_display = ('tutor', 'start_time', 'end_time', 'is_available')
    list_filter = ('is_available',)
    search_fields = ('tutor__user__username',)
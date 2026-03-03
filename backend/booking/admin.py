from django.contrib import admin

from .models import LessonStatus, Plan, Transaction, Schedule, TutorSchedule

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('plan_id', 'name', 'base_fee_bank', 'lessons', 'conversation_classes')
    search_fields = ('plan_id', 'name')
    ordering = ('plan_id',)

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('student', 'plan', 'period_end_date', 'lesson_amount', 'display_remaining_lessons', 'status')
    list_filter = ('plan', 'status')
    search_fields = ('student__user__username', 'plan')
    
    fieldsets = (
        ('基本情報', {
            'fields': ('student', 'plan')
        }),
        ('支払い情報', {
            'fields': ('payment_date', 'payment_method', 'status')
        }),
        ('レッスン情報', {
            'fields': ('lesson_amount', 'period_start_date', 'period_end_date')
        }),
        ('その他', {
            'fields': ('is_conversation_class_included', 'receipt_issued', 'notes')
        }),
    )
    
    def get_readonly_fields(self, request, obj=None):
        # 新規作成時は編集可能、編集時はlesson_amountとperiod_end_dateはreadonly
        if obj:
            return ('lesson_amount', 'period_end_date')
        return ()
    
    def display_remaining_lessons(self, obj):
        return obj.remaining_lessons
    display_remaining_lessons.short_description = '残レッスン数'

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
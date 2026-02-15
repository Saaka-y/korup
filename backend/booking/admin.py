from django.contrib import admin

from .models import LessonStatus, Plan, LessonStatus

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('plan_id', 'name', 'base_fee_bank', 'lessons', 'conversation_classes')
    search_fields = ('plan_id', 'name')
    ordering = ('plan_id',)

@admin.register(LessonStatus)
class LessonStatusAdmin(admin.ModelAdmin):
    list_display = ('user', 'next_lesson_date', 'is_conversation_class', 'is_completed', 'link')
    list_filter = ('is_completed', 'is_conversation_class')
    search_fields = ('user__username',)




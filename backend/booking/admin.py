from django.contrib import admin

from .models import Booking, Plan

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('plan_id', 'name', 'base_fee_bank', 'lessons', 'conversation_classes')
    search_fields = ('plan_id', 'name')
    ordering = ('plan_id',)

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'next_lesson_date', 'is_completed', 'remaining_lessons')
    list_filter = ('is_completed',)
    search_fields = ('user__username',)


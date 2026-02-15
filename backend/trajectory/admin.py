from django.contrib import admin

from .models import Report

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('student', 'created_at', 'is_sent', 'achievement_level')
    list_filter = ('is_sent', 'achievement_level', 'created_at')
    search_fields = ('student__user__username', 'student__user__first_name', 'student__user__last_name')
    date_hierarchy = 'created_at'
    

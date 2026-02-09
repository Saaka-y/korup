from django.contrib import admin

from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'name', 'status', 'plan', 'email')
    list_filter = ('status', 'plan')
    search_fields = ('name', 'student_id', 'email')
    raw_id_fields = ()
    
    # planフィールドを選択しやすいように設定
    autocomplete_fields = []

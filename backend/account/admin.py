from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Student, Tutor, User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('username',)
    
    # roleフィールドを追加表示
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Role', {'fields': ('role',)}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Role', {'fields': ('role',)}),
    )


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'get_name', 'get_email', 'status', 'plan')
    list_filter = ('status', 'plan')
    search_fields = ('user__first_name', 'user__last_name', 'user__email', 'student_id')
    autocomplete_fields = ['user']
    
    @admin.display(description='Name')
    def get_name(self, obj):
        return obj.user.get_full_name() or obj.user.username
    
    @admin.display(description='Email')
    def get_email(self, obj):
        return obj.user.email


@admin.register(Tutor)
class TutorAdmin(admin.ModelAdmin):
    list_display = ('tutor_id', 'get_name', 'get_email', 'status')
    list_filter = ('status',)
    search_fields = ('user__first_name', 'user__last_name', 'user__email', 'tutor_id')
    autocomplete_fields = ['user']
    
    @admin.display(description='Name')
    def get_name(self, obj):
        return obj.user.get_full_name() or obj.user.username
    
    @admin.display(description='Email')
    def get_email(self, obj):
        return obj.user.email



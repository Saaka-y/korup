from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Student, Tutor, User


# インライン編集（User画面内でStudent/Tutorを編集可能に）
class StudentInline(admin.StackedInline):
    model = Student
    can_delete = False
    verbose_name = 'Student Profile'
    extra = 1  # 新規作成用に1つ表示


class TutorInline(admin.StackedInline):
    model = Tutor
    can_delete = False
    verbose_name = 'Tutor Profile'
    extra = 1


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'last_name', 'first_name', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('username',)
    inlines = [StudentInline, TutorInline]
    
    # roleフィールドを追加表示
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Role', {'fields': ('role',)}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Role', {'fields': ('role',)}),
    )


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'get_name', 'get_email', 'status', 'plan', 'remaining_lessons')

    def remaining_lessons(self, obj):
        if obj.status in ('graduated', 'hold'):
            return '-'
        if obj.plan:
            return obj.get_remaining_lessons(obj.plan)
        return 'N/A'
    remaining_lessons.short_description = 'Remained'

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



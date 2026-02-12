from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
	ROLE_CHOICES = [
		('student', 'Student'),
		('tutor', 'Tutor'),
		('admin', 'Admin'),
	]
	role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')


class Student(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
	student_id = models.IntegerField(unique=True)
	status = models.CharField(max_length=20)
	plan = models.ForeignKey('booking.Plan', on_delete=models.SET_NULL, null=True, blank=True)
	base_fee = models.IntegerField(null=True, blank=True)
	special_fee = models.IntegerField(null=True, blank=True)
	final_fee = models.IntegerField(null=True, blank=True)
	payment_method = models.CharField(max_length=20, blank=True)
	level = models.CharField(max_length=50, blank=True)  # レベル
	occupation = models.CharField(max_length=100, blank=True)
	lesson_goal = models.CharField(max_length=200, blank=True)
	hobbies = models.CharField(max_length=200, blank=True)
	referral = models.CharField(max_length=200, blank=True)  # 紹介者
	notes = models.TextField(blank=True)

	def __str__(self):
		return self.user.get_full_name() or self.user.username


class Tutor(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='tutor_profile')
	tutor_id = models.IntegerField(unique=True)
	status = models.CharField(max_length=20)
	invoice_url = models.URLField(blank=True)
	payment_method = models.CharField(max_length=20, blank=True)
	bank = models.CharField(max_length=100, blank=True)
	class_rate = models.IntegerField(null=True, blank=True)

	def __str__(self):
		return self.user.get_full_name() or self.user.username


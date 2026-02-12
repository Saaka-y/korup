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
	STATUS_CHOICES = [
		('active', '継続'),
		('inactive', '休会'),
		('graduated', '卒業'),
		('hold', '保留')
	]
	status = models.CharField(max_length=20, choices=STATUS_CHOICES)
	plan = models.ForeignKey('booking.Plan', on_delete=models.SET_NULL, null=True, blank=True)
	base_fee = models.IntegerField(null=True, blank=True)
	special_fee = models.IntegerField(null=True, blank=True)
	final_fee = models.IntegerField(null=True, blank=True)
	PAYMENT_CHOICES = [
		('bank_transfer', '振込'),
		('credit_card', 'クレカ'),
	]
	payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES, blank=True)
	LEVEL_CHOICES = [
		('A0', 'A0'),
		('A0~A1', 'A0~A1'),
		('A1', 'A1'),
		('A1~A2', 'A1~A2'),
		('A2', 'A2'),
		('A2~B1', 'A2~B1'),
		('B1', 'B1'),
		('B1~B2', 'B1~B2'),
		('B2', 'B2'),
		('B2~C1', 'B2~C1'),
		('C1', 'C1'),
		('C1~C2', 'C1~C2'),
		('C2', 'C2'),
	]
	level = models.CharField(max_length=50, choices=LEVEL_CHOICES, blank=True)  # レベル
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
	STATUS_CHOICES = [
		('active', '在籍'),
		('inactive', '休職'),
		('resigned', '退職')
	]
	status = models.CharField(max_length=20, choices=STATUS_CHOICES)
	invoice_url = models.URLField(blank=True)
	PAYMENT_CHOICES = [
		('bank_transfer', '振込'),
		('Paypal', 'Paypal'),
		('other', 'その他')
	]
	payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES, blank=True)
	bank = models.CharField(max_length=100, blank=True)
	CLASS_RATE_CHOICES = [
		(3000, '3,000'),
		(3300, '3,300')
	]
	class_rate = models.IntegerField(null=True, choices=CLASS_RATE_CHOICES, blank=True)

	def __str__(self):
		return self.user.get_full_name() or self.user.username


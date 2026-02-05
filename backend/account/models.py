from django.db import models

from booking.models import Plan



class Student(models.Model):
	student_id = models.IntegerField(unique=True)
	name = models.CharField(max_length=100)
	status = models.CharField(max_length=20)
	email = models.EmailField(blank=True)
	plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, null=True, blank=True)
	base_fee = models.IntegerField(null=True, blank=True)
	special_fee = models.IntegerField(null=True, blank=True)
	final_fee = models.IntegerField(null=True, blank=True)
	payment_method = models.CharField(max_length=20, blank=True)
	level = models.CharField(max_length=50, blank=True)  # レベル
	occupation = models.CharField(max_length=100, blank=True)
	lesson_goal = models.CharField(max_length=200, blank=True)
	hobbies = models.CharField(max_length=200, blank=True)
	referral = models.CharField(max_length=200, blank=True)  # 紹介者
	background = models.CharField(max_length=200, blank=True)
	notes = models.TextField(blank=True)

	def __str__(self):
		return self.name

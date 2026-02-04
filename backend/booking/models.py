from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='bookings')
    next_lesson_date = models.DateTimeField()
    is_completed = models.BooleanField(default=False)
    remaining_lessons = models.IntegerField(default=0)
    link = models.URLField(max_length=200, blank=True, null=True)
    
    def __str__(self):
      return f"{self.user.username} - {self.next_lesson_date}"
    

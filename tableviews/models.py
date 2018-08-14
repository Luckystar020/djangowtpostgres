from django.db import models

# Create your models here.
class user(models.Model):
    user_id = models.IntegerField()
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    age = models.IntegerField()
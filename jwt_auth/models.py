from django.db import models

# Import AbstractUser
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    # password = models.CharField(max_length=50)
    bio = models.TextField(blank=True)
    profile_pic = models.URLField(blank=True)

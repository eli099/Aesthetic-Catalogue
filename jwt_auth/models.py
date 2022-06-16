from django.db import models

# Import AbstractUser
from django.contrib.auth.models import AbstractUser

# import ArrayField
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    bio = models.TextField(blank=True)
    profile_pic = models.URLField(default="https://cdn-icons-png.flaticon.com/512/1160/1160283.png")
    favourites = models.ManyToManyField(
        'posts.Post',
        related_name = 'users_favourited'
    )

from django.db import models

# import ArrayField
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Post(models.Model):
    image = models.CharField(max_length=500, default=None)
    title = models.CharField(max_length=100, default=None)
    description = models.CharField(max_length=300, default=None)
    artist = models.CharField(max_length=300, default=None)
    source = models.CharField(max_length=500, default=None)
    year = models.PositiveIntegerField(default=None)
    tags = ArrayField(models.CharField(max_length=100, blank=True), size=6)
    
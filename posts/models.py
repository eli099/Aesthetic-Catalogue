from dataclasses import Field
from django.db import models

# import ArrayField
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Post(models.Model):
    image = models.CharField(max_length=500, default=None)
    title = models.CharField(max_length=100, default=None)
    description = models.CharField(max_length=300, default=None, blank=True) 
    artist = models.CharField(max_length=300, default=None)
    source = models.CharField(max_length=500, default=None)
    year = models.PositiveIntegerField(default=None, blank=True, null=True)
    tags = ArrayField(base_field=models.CharField(max_length=50, blank=True, default=list), size=6, blank=True, default=list)
    
    # Return a string of the 
    def __str__(self):
        return f"{self.title} - {self.artist} ({self.year})"
    
from django.contrib import admin

# Import User model
from django.contrib.auth import get_user_model
User = get_user_model()

# Register your models here.
admin.site.register(User)
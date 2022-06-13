from rest_framework import serializers
from django.contrib.auth import get_user_model

# User model
User = get_user_model()

# Import validation error for passwords
from django.core.exceptions import ValidationError

# Import password hasher
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) # Not returned in get requests
    password_confirmation = serializers.CharField(write_only=True) # Not returned in get requests
    
    # custom validator function
    def validate(self, data):
        # Add hashed password to data to be added to database
        
        # Get the password and password_confirmation from teh data
        password = data.pop("password")
        password_confirmation = data.pop("password_confirmation")
        
        # Check password and password_confirmation match
        if password != password_confirmation:
            raise ValidationError({
                "password_confirmation": "Does not match password"
            })
        # Hash the password
        data["password"] = make_password(password)
        
        return data
    
    class Meta:
        model = User
        fields = "__all__"
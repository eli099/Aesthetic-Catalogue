from rest_framework.authentication import BasicAuthentication

# Import exceptions
from rest_framework.exceptions import PermissionDenied

# Import user model
from django.contrib.auth import get_user_model
User = get_user_model()

# JWT
import jwt

# Import project settings (for SECRET_KEY)
from django.conf import settings

class JWTAuthentication(BasicAuthentication):
    
    def authenticate(self, request):
        # Check authorization header exists on request
        header = request.headers.get("Authorization")
        # Define what happens if header does not exist
        if not header:
            return None
        # Check token format
        if not header.startswith("Bearer"):
            raise PermissionDenied(detail="Auth token is invalid")
        # If token exists, remove "Bearer" from the start
        token = header.replace("Bearer ", "")
        # Next: decode the token to get the payload by passing token, SECRET_KEY and algorith into jwt
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            # Get the sub from the payload
            user = User.objects.get(pk=payload.get("sub"))
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied(detail="Invalid token")
        
        # What happens if the sub doesnt match a PK on in the User table
        except User.DoesNotExist:
            raise PermissionDenied(detail="User not found")
        # User is now authenticated
        return (user, token)
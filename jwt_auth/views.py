import jwt
from django.conf import settings
from datetime import datetime, timedelta
from xml.dom import ValidationErr
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework import status

# Import user serializer
from .serializers.common import UserSerializer

# Import user model
from django.contrib.auth import get_user_model

User = get_user_model()

# Import timestamps for use in token creation

# Import secret key from settings

# Import jwt

# Import Perissions
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class RegisterView(APIView):

    

    def post(self, request):
        print("Request Body ->", request.data)
        user_to_add = UserSerializer(data=request.data)
        try:
            user_to_add.is_valid(True)
            user_to_add.save()
            return Response({"message": "Registration Successful"}, status.HTTP_202_ACCEPTED)
        except ValidationError:
            return Response(user_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print("Error type ->", type(e))
            return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def post(self, request):
        print("request data ->", request.data)
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            # Check user email exists in database
            user_to_validate = User.objects.get(email=email)
            print('user_to_validate ->', user_to_validate)
        except User.DoesNotExist:
            raise PermissionDenied("Invalid credentials")
        # Check request (plain text) password matches sound user's hashed password (in database)
        if not user_to_validate.check_password(password):
            raise PermissionDenied("Invalid credentials")
        # If user is verified, need to create a token
        dt = datetime.now() + timedelta(hours=3)
        # Create token
        token = jwt.encode(
            {
                "sub": user_to_validate.id,
                "exp": int(dt.strftime("%s"))
            },
            settings.SECRET_KEY,
            algorithm="HS256"
        )
        # serialized_user = UserSerializer(user_to_validate)
        return Response(
            {
                "message": f"Welcome back, {user_to_validate.username}",
                "token": token,
                "user": {
                    "id": user_to_validate.id,
                    "email": user_to_validate.email,
                    "username":  user_to_validate.username,
                    "first_name": user_to_validate.first_name,
                    "last_name": user_to_validate.last_name,
                    "bio": user_to_validate.bio,
                    "profile_pic": user_to_validate.profile_pic,
                },
                # "favourites": user_to_validate.objects.all()
            },
            status.HTTP_202_ACCEPTED)

# class ProfileView(APIView):
    
#     def put(self, request):
#         print('get user ->', request.user.bio)
        
#         return Response()
        # user_log = UserSerializer(data=request.user)
        
        # try:
        #     user_log.is_valid(True)
        #     return Response(user_log.data, status.HTTP_200_OK)
        # except ValidationError:
        #     return Response(user_log.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        # except Exception as e:
        #     print("Error type ->", type(e))
        #     return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)
        
class ProfileView(APIView):
    
    permission_classes = (IsAuthenticated, )
    
    def get(self, request):
        print('get user ->', request.user)
        # print('get data ->', request.data)
        user_to_find = User.objects.get(username=request.user)
        print('user_to_find ->', user_to_find.username)
        serialized = UserSerializer(user_to_find)
        return Response(serialized.data, status=status.HTTP_200_OK)
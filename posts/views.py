# Import rest_framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Custom imports
from .models import Post

# Import post serializer
from .serializers.common import PostSerializer

# Create your views here.
class PostListView(APIView):
    
    def get(self, _request):
        posts = Post.objects.all() # get all objects from the database
        serialized_posts = PostSerializer(posts, many=True)
        print("serialized data ->", serialized_posts.data)
        return Response(serialized_posts.data, status=status.HTTP_200_OK)
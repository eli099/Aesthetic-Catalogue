# Import rest_framework
from xml.dom import ValidationErr
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Import exceptions
from rest_framework.exceptions import NotFound, ValidationError

# ? Custom imports
# Model to use to query the database
from .models import Post

# ! Import post serializer
from .serializers.common import PostSerializer

# Import populated serializer for comments
from .serializers.populated import PopulatedPostSerializer

# Import Perissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
class PostListView(APIView):
    
    permission_classes = (IsAuthenticatedOrReadOnly, )
    
    # ? Endpoint & Method
    # /posts/
    
    # GET
    # Description: Returns all posts
    def get(self, _request):
        posts = Post.objects.all() # get all objects from the database
        serialized_posts = PostSerializer(posts, many=True)
        print("serialized data ->", serialized_posts.data)
        return Response(serialized_posts.data, status=status.HTTP_200_OK)
    
    # POST
    # Description: Add a new post to the database
    def post(self, request):
        print("Request ->", request.data)
        # Deserialize the data
        deserialized_post = PostSerializer(data=request.data)
        try:
            # Check if has required and valid fields
            deserialized_post.is_valid(True)
            # Save the record to the database
            deserialized_post.save()
            return Response(deserialized_post.data, status.HTTP_201_CREATED)
        except ValidationError:
            return Response(deserialized_post.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print("error type ->", type(e))
            print("error ->", e)
            # Return the validation error
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)
        
class PostDetailView(APIView):
    
    # ? Endpoint: /posts/<int:pk>
    
    # ? Custom Function
    # Description: find specific post based on it's pk. If it's not there then throw an error
    def get_post(self, pk):
        try:
            return Post.objects.get(pk=pk) # Find post where its pk is the same as the pk in the request endpoint
        except Post.DoesNotExist as e:
            print(e)
            raise NotFound({ 'detail': str(e) })
    
    # GET
    # Description: Return one post
    def get(self, _request, pk):
        post = self.get_post(pk)
        print("Post ->", post)
        serialized_post = PopulatedPostSerializer(post) # ! Return post data with comments included
        return Response(serialized_post.data, status.HTTP_200_OK)
    
    # PUT
    # Description: Edit one post from the posts table
    def put(self, request, pk):
        post = self.get_post(pk)
        print("Post ->", post)
        deserialized_post = PostSerializer(post, request.data)
        try:
            deserialized_post.is_valid()
            deserialized_post.save()
            return Response(deserialized_post.data, status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)
        
    # DELETE
    # Description: Delete a post from the posts table
    def delete(self, _request, pk):
        post = self.get_post(pk)
        print("print ->", post)
        post.delete()
        serialized_post = PostSerializer(post)
        return Response(status.HTTP_204_NO_CONTENT)
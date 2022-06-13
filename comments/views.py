from django.forms import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Import permissions
from rest_framework.permissions import IsAuthenticated

# Import comments model
from .models import Comment

# Import NotFound exception
from rest_framework.exceptions import NotFound, PermissionDenied

# Import comment serializer
from .serializers.common import CommentSerializer

# Create your views here.
class CommentListView(APIView):
    
    permission_classes = (IsAuthenticated, )
    
    # Endpoint: /comments/
    
    # POST
    # Description: Post a comment on a post
    def post(self, request):
        request.data["owner"] = request.user.id
        print("request user ->", request.user)
        print("request ->", request.data)
        comment_to_add = CommentSerializer(data=request.data)
        try:
            comment_to_add.is_valid(True)
            comment_to_add.save()
            return Response(comment_to_add.data, status.HTTP_201_CREATED)
        except ValidationError:
            return Response(comment_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print(e)
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)

class CommentDetailView(APIView):
    
    permission_classes = (IsAuthenticated, )
    
    def get_comment(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise NotFound("Comment not found")
            
    
    # DELETE
    # Endpoint: /comments/:id
    # Description: Delete a comment on a post
    def delete(self, request, pk):
        print("PK ->", pk)
        comment_to_delete = self.get_comment(pk)
        print("comment owner ID ->", comment_to_delete.owner)
        print("request user ID ->", request.user)
        if comment_to_delete.owner != request.user:
            print("Cannot delete record")
            raise PermissionDenied()
        print("Can delet record")
        # comment_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
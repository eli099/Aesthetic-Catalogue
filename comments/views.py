from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Import comments model
from .models import Comment

# Import NotFound exception
from rest_framework.exceptions import NotFound

# Import comment serializer
from .serializers.common import CommentSerializer

# Create your views here.
class CommentListView(APIView):
    
    # Endpoint: /comments/
    
    # POST
    # Description: Post a comment on a post
    def post(self, request):
        print("request ->", request.data)
        comment_to_add = CommentSerializer(data=request.data)
        try:
            comment_to_add.is_valid()
            comment_to_add.save()
            return Response(comment_to_add.data, status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)

class CommentDetailView(APIView):
    
    def get_comment(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise NotFound("Comment not found")
            
    
    # DELETE
    # Endpoint: /comments/:id
    # Description: Delete a comment on a post
    def delete(self, _request, pk):
        print("PK ->", pk)
        comment_to_delete = self.get_comment(pk)
        comment_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
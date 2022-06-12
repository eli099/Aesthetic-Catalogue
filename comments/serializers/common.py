# Import REST framework serializer class
from rest_framework import serializers

# Import Comment model (to serialize)
from ..models import Comment

# Define the serializer class
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
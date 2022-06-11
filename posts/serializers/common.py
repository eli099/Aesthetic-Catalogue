from rest_framework import serializers
from ..models import Post

# Serializer class for Post model
class PostSerializer(serializers.ModelSerializer):
    
    # Meta class to define which model to serialize and which fields from the model to serialize
    class Meta:
        model = Post
        fields = '__all__'
        
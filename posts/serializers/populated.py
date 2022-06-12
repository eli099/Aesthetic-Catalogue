# PostSerilaizer to inherit
from .common import PostSerializer

# Import CommentSerializer to pass into reviews field on Post model
from comments.serializers.common import CommentSerializer

# Define populated serializer
class PopulatedPostSerializer(PostSerializer):
    # Define field to populate
    comments = CommentSerializer(many=True)


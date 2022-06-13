# PostSerilaizer to inherit
from .common import PostSerializer

# Import CommentSerializer to pass into reviews field on Post model
from comments.serializers.common import CommentSerializer

# Import populated comment serializer
from comments.serializers.populated import PopulatedCommentSerializer

# Import CategorySerializer
from categories.serializers.common import CategorySerializer

# Define populated serializer
class PopulatedPostSerializer(PostSerializer):
    # Define field to populate
    comments = PopulatedCommentSerializer(many=True)
    categories = CategorySerializer(many=True)


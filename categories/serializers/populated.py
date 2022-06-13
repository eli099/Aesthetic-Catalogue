from .common import CategorySerializer
from posts.serializers.common import PostSerializer

class PopulatedCategorySerializer(CategorySerializer):
    posts = PostSerializer(many=True)
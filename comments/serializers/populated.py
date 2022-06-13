from .common import CommentSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedCommentSerializer(CommentSerializer):
    owner = UserSerializer()
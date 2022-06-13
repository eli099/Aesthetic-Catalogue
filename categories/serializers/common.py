# Import model serializer
from rest_framework.serializers import ModelSerializer

# Import category model
from ..models import Category

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
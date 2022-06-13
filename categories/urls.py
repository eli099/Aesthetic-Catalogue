from django.urls import path

# Import category views
from .views import CategoryListView

urlpatterns = [
    path('', CategoryListView.as_view())
]
from django.urls import path

# Import comments view
from .views import CommentListView, CommentDetailView

urlpatterns = [
    path('', CommentListView.as_view()),
    path('<int:pk>/', CommentDetailView.as_view())
]
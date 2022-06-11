from django.urls import path # import path so we can set  endpoints and views

# Import post list view
from .views import PostListView

urlpatterns = [
    path('', PostListView.as_view())
]

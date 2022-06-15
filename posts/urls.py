from django.urls import path # import path so we can set  endpoints and views

# Import post list view
from .views import PostListView, PostDetailView

urlpatterns = [
    path('', PostListView.as_view()), # Returns all posts
    path('<int:pk>/', PostDetailView.as_view()), # Returns one specific post - based on its pk
    # path('fav/<int:pk>/', AddFavouriteView.as_view())
]

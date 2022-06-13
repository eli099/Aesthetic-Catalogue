from django.db import models

# Create your models here.
class Comment(models.Model):
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    # The post that the comment is about, using the foreign key
    post = models.ForeignKey(
        'posts.Post', # Model to look for on foreign key
        related_name='comments', # The field on the 'one' in the 'one to many' relationship
        on_delete= models.CASCADE # 'CASCADE' so that comments are deleted if Post is deleted
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="comments",
        on_delete=models.CASCADE
    )
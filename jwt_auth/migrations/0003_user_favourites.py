# Generated by Django 4.0.5 on 2022-06-14 22:33

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0002_alter_user_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='favourites',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, default=list, max_length=50), blank=True, default=list, size=6),
        ),
    ]

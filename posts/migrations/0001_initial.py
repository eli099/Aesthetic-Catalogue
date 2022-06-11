# Generated by Django 4.0.5 on 2022-06-10 12:12

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.CharField(default=None, max_length=500)),
                ('title', models.CharField(default=None, max_length=100)),
                ('description', models.CharField(default=None, max_length=300)),
                ('artist', models.CharField(default=None, max_length=300)),
                ('source', models.CharField(default=None, max_length=500)),
                ('year', models.PositiveIntegerField(default=None)),
                ('tags', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=100), size=6)),
            ],
        ),
    ]
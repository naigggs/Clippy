# Generated by Django 4.2.10 on 2024-03-16 16:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_user_chat_logs'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='chat_logs',
        ),
    ]
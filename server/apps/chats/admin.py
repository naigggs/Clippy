from django.contrib import admin
# Models
from .models import *


@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id')
    readonly_fields = ('id', 'created_at', 'updated_at')

    fieldsets = (
        ('Chat Details', {'fields': ('prompt', 'message')}), (
            'Timestamps', {'fields': ('created_at', 'updated_at')}
        )
    )

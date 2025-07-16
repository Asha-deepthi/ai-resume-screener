from django.contrib import admin
from .models import JobTemplate

@admin.register(JobTemplate)
class JobTemplateAdmin(admin.ModelAdmin):
    list_display = ('title', 'experience_level') 
    search_fields = ('title', 'description', 'skills')

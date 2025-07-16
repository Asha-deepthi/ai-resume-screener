from django.db import models
from users.models import CustomUser

class JobTemplate(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    skills = models.TextField(help_text="Comma-separated list")
    experience_level = models.CharField(max_length=20, choices=[('entry', 'Entry'), ('mid', 'Mid'), ('senior', 'Senior')])

    def __str__(self):
        return f"{self.title} ({self.experience_level})"

class Job(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    required_skills = models.TextField()
    experience_level = models.CharField(max_length=20, choices=[
        ('entry', 'Entry'),
        ('mid', 'Mid'),
        ('senior', 'Senior')
    ])
    posted_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# resumes/urls.py
from django.urls import path
from .views import ResumeUploadView, ResumeListView

urlpatterns = [
    path('upload_resume/', ResumeUploadView.as_view()),
    path('hr/resumes/', ResumeListView.as_view()),
]

from django.urls import path
from .views import JobTemplateListView , JobCreateView , JobListView

urlpatterns = [
    path('templates/', JobTemplateListView.as_view(), name='job-templates'),
    path('create/', JobCreateView.as_view(), name='job-create'),
    path('all/', JobListView.as_view(), name='job-list'),
]

from django.urls import path
from .views import HRLoginView, HRSignupView

urlpatterns = [
    path('hr-login/', HRLoginView.as_view()),
    path('hr-signup/', HRSignupView.as_view()),
]

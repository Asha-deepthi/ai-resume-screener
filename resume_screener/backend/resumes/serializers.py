# resumes/serializers.py
from rest_framework import serializers
from .models import CandidateResume

class CandidateResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateResume
        fields = '__all__'

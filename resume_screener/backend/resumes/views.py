# resumes/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework import status
from .models import CandidateResume
from .serializers import CandidateResumeSerializer
from users.permissions import IsHRUser

class ResumeUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        print(request.FILES)
        print(request.POST)
        serializer = CandidateResumeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Resume uploaded successfully!'}, status=201)
        return Response(serializer.errors, status=400)

class ResumeListView(APIView):
    permission_classes = [IsHRUser]

    def get(self, request):
        resumes = CandidateResume.objects.all().order_by('-id')
        serializer = CandidateResumeSerializer(resumes, many=True)
        return Response(serializer.data)

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import JobTemplate, Job
from .serializers import JobTemplateSerializer, JobSerializer

class JobTemplateListView(generics.ListAPIView):
    serializer_class = JobTemplateSerializer
    queryset = JobTemplate.objects.all()
    permission_classes = [permissions.IsAuthenticated]

class JobCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(posted_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class JobListView(generics.ListAPIView):
    queryset = Job.objects.all().order_by("-id")
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]
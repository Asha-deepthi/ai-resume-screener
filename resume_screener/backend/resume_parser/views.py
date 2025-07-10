from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import ParsedResume
from .utils import extract_text_from_pdf, extract_text_from_docx, extract_emails, extract_phone_numbers, extract_name, extract_skills
import os
from django.conf import settings

class ResumeUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        file_obj = request.FILES.get("file")
        if not file_obj:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Save file temporarily
        temp_path = os.path.join(settings.MEDIA_ROOT, file_obj.name)
        with open(temp_path, 'wb+') as f:
            for chunk in file_obj.chunks():
                f.write(chunk)

        # Extract text
        if file_obj.name.endswith('.pdf'):
            text = extract_text_from_pdf(temp_path)
        elif file_obj.name.endswith('.docx'):
            text = extract_text_from_docx(temp_path)
        else:
            os.remove(temp_path)
            return Response({"error": "Unsupported file format"}, status=status.HTTP_400_BAD_REQUEST)

        # Extract info
        email = extract_emails(text)
        phone = extract_phone_numbers(text)
        name = extract_name(text)
        skills = extract_skills(text)

        # Save to DB
        parsed_resume = ParsedResume.objects.create(
            file_name=file_obj.name,
            candidate_name=name or "",
            email=email[0] if email else "",
            phone=phone[0][0] if phone else "",
            skills=skills or "",
            education="",
            experience="",
        )

        # Clean up temp file
        os.remove(temp_path)

        # Return parsed info
        return Response({
            "file_name": parsed_resume.file_name,
            "candidate_name": parsed_resume.candidate_name,
            "email": parsed_resume.email,
            "phone": parsed_resume.phone,
            "skills": parsed_resume.skills,
        })

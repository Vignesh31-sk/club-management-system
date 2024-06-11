from django.shortcuts import render
from rest_framework import viewsets
from .models import Faculty
from .serializers import FacultySerializer
from rest_framework.parsers import MultiPartParser, FormParser


class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    parser_classes = [MultiPartParser, FormParser]


def faculty(request):
    return render(request, 'faculty.html')

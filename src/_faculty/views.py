from django.shortcuts import render
from rest_framework import viewsets
from .models import Faculty
from .serializers import FacultySerializer


class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer


def faculty(request):
    return render(request, 'faculty.html')

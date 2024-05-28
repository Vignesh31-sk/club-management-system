from rest_framework import viewsets
from .models import Club
from .serializers import ClubSerializer
from django.shortcuts import render


class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer


def clubs(request):
    return render(request, 'clubs.html')

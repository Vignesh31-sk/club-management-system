from rest_framework import viewsets
from .models import Club
from .serializers import ClubSerializer


class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

from django.shortcuts import render
from rest_framework import viewsets
from .models import Event, Participant
from .serializers import EventSerializer, ParticipantSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class ParticipantViewSet(viewsets.ModelViewSet):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer


def event(request):
    return render(request, 'events.html')


def participants(request):
    return render(request, 'participations.html')

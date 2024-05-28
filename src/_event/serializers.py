# _event/serializers.py
from rest_framework import serializers
from .models import Event, Participant


class EventSerializer(serializers.ModelSerializer):

    club_name = serializers.ReadOnlyField(source='club.name')

    class Meta:
        model = Event
        fields = '__all__'

    def validate(self, data):
        club = data.get('club')
        host = data.get('host')

        if club and host and host.membership != club:
            raise serializers.ValidationError(
                "The host must be a member of the organizing club.")

        return data


class ParticipantSerializer(serializers.ModelSerializer):

    event_name = serializers.ReadOnlyField(source='event.name')

    class Meta:
        model = Participant
        fields = '__all__'

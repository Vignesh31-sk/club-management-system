# _club/serializers.py
from rest_framework import serializers
from .models import Club


class ClubSerializer(serializers.ModelSerializer):
    president_name = serializers.ReadOnlyField(source='president.name')

    class Meta:
        model = Club
        fields = '__all__'

from rest_framework import serializers
from .models import Faculty


class FacultySerializer(serializers.ModelSerializer):

    club_names = serializers.SerializerMethodField()

    class Meta:
        model = Faculty
        fields = '__all__'

    def get_club_names(self, obj):
        return [club.name for club in obj.clubs.all()]

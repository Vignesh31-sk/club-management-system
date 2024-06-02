from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    club_name = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = '__all__'
        read_only_fields = ('SRN', 'name')

    def get_club_name(self, obj):
        return obj.membership.name if obj.membership else None

    def validate(self, data):
        # Ensuring the president is part of the same club
        if self.instance:
            current_member = self.instance
            new_club = data.get('membership')
            current_club = current_member.membership

            if current_club != new_club and current_club.president == current_member:
                raise serializers.ValidationError(
                    "The current member is a president of a different club.")
        return data

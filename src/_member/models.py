from django.db import models
from django.forms import ValidationError


class Student(models.Model):
    SRN = models.CharField(primary_key=True, max_length=50)
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    semester = models.IntegerField()
    membership = models.ForeignKey(
        # ! It is impossible to add a non-nullable field 'membership' to member without specifying a default. This is because the database needs something to populate existing rows.
        '_club.Club', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def clean(self):
        new_club = self.membership
        if self.pk:
            current_member = Student.objects.get(pk=self.pk)
            current_club = current_member.membership
            if (
                    current_club != new_club and
                    hasattr(current_member, 'membership') and
                    current_club.president == self
            ):
                raise ValidationError(
                    "The current member is a president.")
        return super().clean()

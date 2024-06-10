from django.db import models
from django.forms import ValidationError
from phonenumber_field.modelfields import PhoneNumberField


class Student(models.Model):
    SRN = models.CharField(primary_key=True, max_length=50)
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    mobile = PhoneNumberField()
    semester = models.IntegerField()
    membership = models.ForeignKey('_club.Club', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def clean(self):
        if self.membership_id is None:
            raise ValidationError("Membership (club) must be specified.")

        new_club = self.membership
        if self.pk is not None:
            try:
                current_member = Student.objects.get(pk=self.pk)
                current_club = current_member.membership
                if (
                    current_club != new_club and
                    hasattr(current_member, 'membership') and
                    current_club.president == self
                ):
                    raise ValidationError(
                        "The current member is a president."
                    )
            except Student.DoesNotExist:
                print('Student has not been created yet!')
                pass  # This can happen if the object is new and doesn't exist in the database yet

        return super().clean()

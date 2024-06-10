from django.db import models
from django.forms import ValidationError
from phonenumber_field.modelfields import PhoneNumberField


class Event(models.Model):

    name = models.CharField(max_length=50)
    host = models.ForeignKey(
        "_member.Student", on_delete=models.CASCADE)
    location = models.CharField(max_length=50)
    date = models.DateField(auto_now=False, auto_now_add=False)
    club = models.ForeignKey(
        "_club.Club", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

    def clean(self):
        if self.host.membership != self.club:
            raise ValidationError(
                "The host must be a member of the specified club.")
        return super().clean()


class Participant(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    mobile = PhoneNumberField()
    semester = models.SmallIntegerField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Faculty(models.Model):
    name = models.CharField(max_length=50)
    department = models.CharField(max_length=10)
    email = models.EmailField(max_length=254)
    mobile = PhoneNumberField()
    clubs = models.ManyToManyField("_club.Club")

    def __str__(self):
        return self.name

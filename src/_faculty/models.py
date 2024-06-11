from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


def upload_image(instance, filename):
    ext = filename.split('.')[-1]
    return f'faculty/{instance.id}.{ext}'


class Faculty(models.Model):
    name = models.CharField(max_length=50)
    department = models.CharField(max_length=10)
    email = models.EmailField(max_length=254)
    mobile = PhoneNumberField()
    clubs = models.ManyToManyField("_club.Club")
    image = models.ImageField(upload_to=upload_image, blank=True, null=True)

    def __str__(self):
        return self.name

from django.db import models
from django.core.exceptions import ValidationError


def upload_image(instance, filename):
    ext = filename.split('.')[-1]
    return f'clubs/{instance.id}.{ext}'


class Club(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=200)
    president = models.OneToOneField(
        '_member.Student',
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )
    image = models.ImageField(null=True, blank=True, upload_to=upload_image)

    def __str__(self):
        return self.name

    def clean(self):
        if self.president and self.president.membership != self:
            raise ValidationError(
                "The president must be a member of the same club.")
        return super().clean()

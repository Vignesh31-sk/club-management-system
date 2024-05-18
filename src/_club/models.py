from django.db import models
from django.core.exceptions import ValidationError


class Club(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    president = models.OneToOneField(
        '_member.Member',
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    def __str__(self):
        return self.name

    def clean(self):
        if self.president and self.president.membership != self:
            raise ValidationError(
                "The president must be a member of the same club.")
        return super().clean()

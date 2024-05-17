from django.db import models


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

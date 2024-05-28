from django.db import models


class Faculty(models.Model):
    name = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    clubs = models.ManyToManyField("_club.Club")

    def __str__(self):
        return self.name

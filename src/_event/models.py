from django.db import models


class Event(models.Model):

    name = models.CharField(max_length=50)
    host = models.CharField(max_length=50, blank=True, null=True)
    location = models.CharField(max_length=50)
    date = models.DateField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return self.name


class Participant(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    semester = models.SmallIntegerField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __self__(self):
        return self.name

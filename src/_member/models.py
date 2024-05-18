from django.db import models
from django.forms import ValidationError


class Member(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    membership = models.ForeignKey(
        # ! It is impossible to add a non-nullable field 'membership' to member without specifying a default. This is because the database needs something to populate existing rows.
        '_club.Club', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

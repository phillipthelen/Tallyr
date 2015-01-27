from django.db import models
from django.contrib.auth.models import User

class Item(models.Model):

    value = models.FloatField(default=1.0)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Item"
        verbose_name_plural = "Items"

class tally(models.Model):

    created_on = models.DateTimeField(auto_created=True)
    paid_on = models.DateTimeField()

    user = models.ForeignKey(User)
    item = models.ForeignKey(Item)
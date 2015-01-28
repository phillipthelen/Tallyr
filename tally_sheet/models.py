from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser


class TallyUser(AbstractUser):

    public = models.BooleanField(default=True)
    balance = models.FloatField(default=0.0)


class Item(models.Model):

    value = models.FloatField(default=1.0)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Item"
        verbose_name_plural = "Items"


class Tally(models.Model):

    created_on = models.DateTimeField(auto_now_add=True)
    paid_on = models.DateTimeField(null=True, blank=True)

    user = models.ForeignKey(TallyUser, related_name="tallies")
    item = models.ForeignKey(Item, related_name="tallies")

    def __str__(self):
        return "{0} by {1}".format(self.item, self.user)

    class Meta:
        verbose_name = "Tally"
        verbose_name_plural = "Tallies"

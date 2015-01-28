__author__ = 'viirus'
from rest_framework.serializers import ModelSerializer, SerializerMethodField, Serializer, SlugRelatedField
from .models import Tally, Item, TallyUser
from django.db.models import Count


class ItemSerializer(ModelSerializer):

    class Meta:
        model = Item


class PublicTallySerializer(Serializer):

    tally_count = SerializerMethodField()

    def get_tally_count(self, obj):
        return obj.tally_count

    class Meta:
        fields = ("item__name", "item__pk", "tally_count")


class PublicTallyListSerializer(ModelSerializer):

    public_tallies = SerializerMethodField()
    balance = SerializerMethodField()

    def get_balance(self, obj):
        balance = obj.balance
        tallies = obj.tallies.filter(paid_on=None).annotate(tally_count=Count("item"))
        for tally in tallies:
            balance -= tally.item.value * tally.tally_count
        return balance

    def get_public_tallies(self, obj):
        tallies = obj.tallies.filter(paid_on=None).values("item__name", "item__pk", "item__value").annotate(tally_count=Count("item__pk"))
        return tallies

    class Meta:
        model = TallyUser
        fields = ("pk", "username", "first_name", "last_name", "balance", "public_tallies")

class TallySerializer(ModelSerializer):

    user = SlugRelatedField(slug_field="username", queryset=TallyUser.objects.all())

    class Meta:
        model = Tally
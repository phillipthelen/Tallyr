__author__ = 'viirus'
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView
from rest_framework.views import APIView, Response
from .models import TallyUser
from .serializers import PublicTallyListSerializer, TallySerializer, BalanceSerializer
from datetime import datetime

class PublicTallyApiView(ListAPIView):
    queryset = TallyUser.objects.filter(public=True).order_by("username")
    serializer_class = PublicTallyListSerializer

class AddTallyApiView(CreateAPIView):
    serializer_class = TallySerializer

    def create(self, request, *args, **kwargs):
        serializer = TallySerializer(data=request.DATA)
        if serializer.is_valid():
            serializer.save()
            tally = serializer.instance
            user = tally.user
            if user.balance >= tally.item.value:
                user.balance -= tally.item.value
                user.save()
                tally.paid_on = datetime.now()
                tally.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ChangeBalanceApiView(APIView):

    def post(self, request):
        serializer = BalanceSerializer(data=request.DATA)

        if serializer.is_valid():
            data = serializer.data
            user = TallyUser.objects.get(username=data["user"])
            tallies = user.tallies.filter(paid_on=None)
            balance = user.balance + data["balance_change"]

            if tallies.count() > 0:
                for tally in tallies:
                    if balance >= tally.item.value:
                        balance = round(balance-tally.item.value, 2)
                        tally.paid_on = datetime.now()
                        tally.save()
                    else:
                        break
            user.balance = balance
            user.save()
            user_serializer = PublicTallyListSerializer(instance=user)
            return Response(user_serializer.data, status=200)
        return Response(serializer.errors, status=400)
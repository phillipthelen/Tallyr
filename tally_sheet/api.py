__author__ = 'viirus'
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView
from rest_framework.views import APIView, Response
from .models import TallyUser
from .serializers import PublicTallyListSerializer, TallySerializer, BalanceSerializer
from datetime import datetime

class PublicTallyApiView(ListAPIView):
    queryset = TallyUser.objects.filter(public=True)
    serializer_class = PublicTallyListSerializer

class AddTallyApiView(CreateAPIView):
    serializer_class = TallySerializer



class ChangeBalanceApiView(APIView):

    def post(self, request):
        serializer = BalanceSerializer(data=request.DATA)

        if serializer.is_valid():
            data = serializer.data
            user = TallyUser.objects.get(username=data["user"])
            tallies = user.tallies.filter(paid_on=None)
            balance_change = data["balance_change"]

            if tallies.count() > 0:
                tally = tallies[0]
                tally_counter = 0
                while balance_change >= tally.item.value:
                    balance_change -= tally.item.value
                    tally.paid_on = datetime.now()
                    tally.save()
                    tally_counter += 1
                    if tallies.count() > tally_counter:
                        tally = tallies[tally_counter]
                    else:
                        break
            user.balance += balance_change
            user.save()
            user_serializer = PublicTallyListSerializer(instance=user)
            return Response(user_serializer.data, status=200)
        return Response(serializer.errors, status=400)
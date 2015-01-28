__author__ = 'viirus'
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView
from .models import TallyUser
from .serializers import PublicTallyListSerializer, TallySerializer


class PublicTallyApiView(ListAPIView):
    queryset = TallyUser.objects.filter(public=True)
    serializer_class = PublicTallyListSerializer

class AddTallyApiView(CreateAPIView):
    serializer_class = TallySerializer
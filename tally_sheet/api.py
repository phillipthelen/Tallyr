__author__ = 'viirus'
from rest_framework.generics import RetrieveAPIView, ListAPIView
from .models import TallyUser
from .serializers import PublicTallyListSerializer


class PublicTallyApiView(ListAPIView):
    queryset = TallyUser.objects.filter(public=True)
    serializer_class = PublicTallyListSerializer
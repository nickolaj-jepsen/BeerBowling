from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import api_view

from beerbowling.games.models import Game
from beerbowling.games.serializers import GameSerializer


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


@api_view(['POST'])
def create_view(self, request):
    print('hello')
    return 
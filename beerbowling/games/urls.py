from django.urls import path, include
from rest_framework import routers

from beerbowling.games.views import GameViewSet, create_view

router = routers.DefaultRouter()
router.register("", GameViewSet)

urlpatterns = [
    path("api/games", include(router.urls)),
    path("api/games/create", create_view)
]

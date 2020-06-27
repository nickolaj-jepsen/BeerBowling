from enum import Enum

from django.db import models

from beerbowling.players.models import Player


class GameEventType(Enum):
    GOAL = "goal"
    OWN_GOAL = "own_goal"


class Team(Enum):
    HomeTeam = "home_team"
    AwayTeam = "away_team"


class SubstitutionState(Enum):
    SubIn = "subbed in"
    SubOut = "subbed out"


class Game(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    participants = models.ManyToManyField(
        Player,
        through='GameParticipant',
        through_fields=('game', 'player')
    )


class GameParticipant(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    team = models.TextField(choices=[(tag, tag.value) for tag in Team])
    substitution_state = models.TextField(choices=[(tag, tag.value) for tag in SubstitutionState], null=True)


class GameEvent(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    type = models.TextField(
        choices=[(tag, tag.value) for tag in GameEventType]
    )
    player = models.ForeignKey(Player, on_delete=models.SET_NULL, null=True)

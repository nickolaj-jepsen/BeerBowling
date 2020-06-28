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
        Player, through="GameParticipant", through_fields=("game", "player")
    )

    def add_player(self, player: Player, team: Team):
        return GameParticipant.objects.create(game=self, player=player, team=team)

    def add_score(self, player: Player, own_goal=False):
        event_type = GameEventType.GOAL
        if own_goal:
            event_type = GameEventType.OWN_GOAL
        return GameEvent.objects.create(type=event_type, player=player, game=self)

    def participant_for_team(self, team: Team):
        player_ids = self.gameparticipant_set.exclude(
            substitution_state=SubstitutionState.SubOut
        ).filter(team=team).values_list('player_id', flat=True)
        return Player.objects.filter(pk__in=player_ids)

    def score_for_team(self, team: Team):
        players = self.participant_for_team(team)
        goals = self.event.filter(player__in=players, type=GameEventType.GOAL).count()
        own_goals = self.event.exclude(player__in=players).filter(type=GameEventType.OWN_GOAL).count()
        return goals + own_goals

    @property
    def home_team_participants(self):
        return self.home_team_participants(Team.HomeTeam)

    @property
    def away_team_participants(self):
        return self.home_team_participants(Team.AwayTeam)


class GameParticipant(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    team = models.TextField(choices=[(tag, tag.value) for tag in Team])
    substitution_state = models.TextField(
        choices=[(tag, tag.value) for tag in SubstitutionState], null=True
    )


class GameEvent(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    type = models.TextField(choices=[(tag, tag.value) for tag in GameEventType])
    player = models.ForeignKey(Player, on_delete=models.SET_NULL, null=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name="event")

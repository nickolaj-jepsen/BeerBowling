from rest_framework import serializers

from beerbowling.games.models import Game, GameParticipant


class GameParticipantSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source="player.name")
    nickname = serializers.ReadOnlyField(source="player.nickname")

    class Meta:
        model = GameParticipant
        fields = ["name", "nickname", "team", "substitution_state"]


class GameSerializer(serializers.ModelSerializer):
    home_team = GameParticipantSerializer(source='home_team_participants')
    away_team = GameParticipantSerializer(source='away_team_participants')

    class Meta:
        model = Game
        fields = ["created", "modified", "participants"]

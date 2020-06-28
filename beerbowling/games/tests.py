from django.test import TestCase

from beerbowling.games.models import Game, Team
from beerbowling.players.models import Player


class GameModelTestCase(TestCase):
    def setUp(self):
        self.player1 = Player.objects.create(name='testplayer1')
        self.player2 = Player.objects.create(name='testplayer2')
        self.player3 = Player.objects.create(name='testplayer3')
        self.player4 = Player.objects.create(name='testplayer4')

        self.game = Game.objects.create()
        self.game.add_player(self.player1, Team.HomeTeam)
        self.game.add_player(self.player2, Team.HomeTeam)
        self.game.add_player(self.player3, Team.AwayTeam)
        self.game.add_player(self.player4, Team.AwayTeam)

    def test_game_setup(self):
        self.assertEqual(self.game.participants.count(), 4)

    def test_add_score(self):
        self.game.add_score(player=self.player1)
        self.game.add_score(player=self.player3)
        self.game.add_score(player=self.player4)
        self.game.add_score(player=self.player4)
        self.assertEqual(self.game.score_for_team(Team.HomeTeam), 1)
        self.assertEqual(self.game.score_for_team(Team.AwayTeam), 3)

    def test_own_goal(self):
        self.game.add_score(player=self.player1, own_goal=True)
        self.assertEqual(self.game.score_for_team(Team.HomeTeam), 0)
        self.assertEqual(self.game.score_for_team(Team.AwayTeam), 1)


class GameApiTestCase(TestCase):
    def setUp(self):
        self.player1 = Player.objects.create(name='testplayer1')
        self.player2 = Player.objects.create(name='testplayer2')
        self.player3 = Player.objects.create(name='testplayer3')
        self.player4 = Player.objects.create(name='testplayer4')

    def test_create_game(self):
        res = self.client.get('/api/games')
        self.assertEqual(res.json(), [])

        res = self.client.post('/api/games/create', {
            'team1': [self.player1.pk, self.player2.pk],
            'team2': [self.player3.pk, self.player4.pk]
        })

        print(res)
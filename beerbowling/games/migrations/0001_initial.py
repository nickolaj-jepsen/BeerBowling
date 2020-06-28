# Generated by Django 3.0.6 on 2020-06-27 01:29

import beerbowling.games.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("players", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Game",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("modified", models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name="GameParticipant",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "team",
                    models.TextField(
                        choices=[
                            (beerbowling.games.models.Team["HomeTeam"], "home_team"),
                            (beerbowling.games.models.Team["AwayTeam"], "away_team"),
                        ]
                    ),
                ),
                (
                    "substitution_state",
                    models.TextField(
                        choices=[
                            (
                                beerbowling.games.models.SubstitutionState["SubIn"],
                                "subbed in",
                            ),
                            (
                                beerbowling.games.models.SubstitutionState["SubOut"],
                                "subbed out",
                            ),
                        ],
                        null=True,
                    ),
                ),
                (
                    "game",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="games.Game"
                    ),
                ),
                (
                    "player",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="players.Player"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="GameEvent",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("modified", models.DateTimeField(auto_now=True)),
                (
                    "type",
                    models.TextField(
                        choices=[
                            (beerbowling.games.models.GameEventType["GOAL"], "goal"),
                            (
                                beerbowling.games.models.GameEventType["OWN_GOAL"],
                                "own_goal",
                            ),
                        ]
                    ),
                ),
                (
                    "player",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="players.Player",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="game",
            name="participants",
            field=models.ManyToManyField(
                through="games.GameParticipant", to="players.Player"
            ),
        ),
    ]

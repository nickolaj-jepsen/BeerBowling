from django.db import models


class Player(models.Model):
    name = models.TextField()
    nickname = models.TextField(null=True)


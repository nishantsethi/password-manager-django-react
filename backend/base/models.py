from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Org(models.Model):
    user = models.ForeignKey(User,
                             on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True)
    address = models.TextField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)

    def __str__(self):
        return self.name


class PassGroup(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User,
                             on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class AppPass(models.Model):
    group = models.ForeignKey(PassGroup, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=400, blank=True, null=True)
    password = models.CharField(max_length=400)
    description = models.TextField(null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User,
                             on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

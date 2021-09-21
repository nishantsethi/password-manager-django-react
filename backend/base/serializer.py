from os import read
from re import L
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken, Token
from .models import Org, AppPass, PassGroup

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class OrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Org
        fields = '__all__'

class PassGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassGroup
        fields = '__all__'

class PasswordSerializer(serializers.ModelSerializer):

    # group = PassGroupSerializer(read_only=True)
    

    class Meta:
        model = AppPass
        fields = ('id','group', 'name', 'url', 'password', 'description', 'note', 'user') 





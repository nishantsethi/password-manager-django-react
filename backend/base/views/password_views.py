from django.shortcuts import render
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.serializer import OrgSerializer, PasswordSerializer, PassGroupSerializer
from base.models import Org, AppPass, PassGroup
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from base.encrypter import encryption_util as eu


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def AppPassView(request):
    """
    Get list of all passwords
    """
    user = request.user
    passes = AppPass.objects.filter(user=user)
    data = PasswordSerializer(passes, many=True).data

    return Response(data)


@api_view(['GET'])
def PassGroupsView(request):
    """
    Get List of all Groups
    """
    groups = PassGroup.objects.all()
    data = PassGroupSerializer(groups, many=True).data
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPass(request, pk):
    """
    Get Single Password
    """


    

    try:
        apppass = AppPass.objects.get(id=pk, user=request.user)


        serializer = PasswordSerializer(apppass)
        serializer = serializer.data

        passw = {
        'id':serializer['id'],
        'name':serializer['name'],
        'url':serializer['url'],
        'password':eu.decrypt(serializer['password']),
        'description':serializer['description'],
        'note':serializer['note'],
        'group':serializer['group'],
        'user':serializer['user']
    }

        return Response(passw, status=status.HTTP_200_OK)
    except:
        return Response({"error":"Unauthorized user"}, status=status.HTTP_401_UNAUTHORIZED)

    

    return Response(passw)


@api_view(['GET'])
def getGroup(request, pk):
    """
    Get Single Group
    """
    group = PassGroup.objects.get(id=pk)
    serializer = PassGroupSerializer(group)
    return Response(serializer.data)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def createPass(request):
#     """
#     Add a new Passwords
#     """

#     data = request.data

#     passw = AppPass.objects.create(
#         group=data['group'],
#         name=data['name'],
#         url=data['url'],
#         password=eu.encrypt(data['password']),
#         description=data['description'],
#         note=data['note'],
#         user=data['user']
#     )
#     serializer = PasswordSerializer(data=passw, read_only=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     else:
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPass(request):
    """
    Add a new Passwords
    """

    data = request.data

    passw = {
        'name':data['name'],
        'url':data['url'],
        'password':eu.encrypt(data['password']),
        'description':data['description'],
        'note':data['note'],
        'group':data['group'],
        'user':request.user.id
    }

    serializer = PasswordSerializer(data=passw)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updatePass(request, pk):
    """
    Update a Passwords
    """

        
    try:
        data = request.data
        apppass = AppPass.objects.get(id=pk, user=request.user)

        print(apppass)

        

        

        print(data)

        if 'name' in data:
            apppass.name = data['name']

        if 'url' in  data:
            apppass.url = data['url']
        
        if 'password' in data:
            apppass.password = eu.encrypt(data['password'])
        
        if 'description' in data:
            apppass.description = data['description']
        
        if 'note' in data:
            apppass.note = data['note']

        apppass.save()

        serializer = PasswordSerializer(apppass, many=False)
        serializer = serializer.data

        

        return Response(serializer, status=status.HTTP_200_OK)
    except:
        return Response({"error":"Unauthorized user"}, status=status.HTTP_401_UNAUTHORIZED)




@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePass(request, pk):

    try:
        apppass = AppPass.objects.get(id=pk, user=request.user)
        apppass.delete()

        return Response("Password Deleted")
    except:
        return Response({"error":"Unauthorized user"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def createGroup(request):
    """
    Add a new Group
    """
    serializer = PassGroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

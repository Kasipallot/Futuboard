from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from quickstart.serializers import UserSerializer, GroupSerializer
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.http import Http404
from .models import Board
import json

from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
@api_view()
def get_all_boards(request):
    query_set = Board.objects.all()
    data = serializers.serialize("json", query_set)
    return HttpResponse(data)

@api_view()
def get_board_by_id(request, board_id):
    try:
        query_set = Board.objects.filter(pk=board_id)
    except Board.DoesNotExist:
        raise Http404("Restaurant does not exist")
        
    data = serializers.serialize("json", query_set)
    return HttpResponse(data)



class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
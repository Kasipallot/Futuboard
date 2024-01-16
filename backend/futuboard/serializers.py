from .models import Board, Column, Ticket, User
from rest_framework import serializers


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['boardid', 'description', 'title', 'creator', 'creation_date', 'passwordhash', 'salt']


class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = ['columnid', 'boardid', 'wip_limit', 'color', 'description', 'title', 'ordernum', 'creation_date']

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['ticketid', 'columnid', 'title', 'description', 'color', 'storypoints', 'size', 'order', 'creation_date']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['userid', 'name']
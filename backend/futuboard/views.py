from django.http import Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from .models import Board, Column, Ticket
from .serializers import BoardSerializer, ColumnSerializer, TicketSerializer

# Create your views here.
@api_view(['GET'])
def get_all_boards(request, format=None):
    query_set = Board.objects.all()
    serializer = BoardSerializer(query_set, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_board_by_id(request, board_id):
    try:
        query_set = Board.objects.filter(pk=board_id)
    except Board.DoesNotExist:
        raise Http404("Board does not exist")
        
    serializer = BoardSerializer(query_set, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_columns_from_board(request, board_id):
    query_set = Column.objects.filter(boardid=board_id).order_by('ordernum')
    serializer = ColumnSerializer(query_set, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_tickets_from_column(request, board_id, column_id):
    query_set = Ticket.objects.filter(columnid=column_id).order_by('order')
    serializer = TicketSerializer(query_set, many=True)
    return Response(serializer.data)
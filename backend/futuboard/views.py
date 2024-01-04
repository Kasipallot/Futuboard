from django.http import Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from .models import Board, Column, Ticket
from .serializers import BoardSerializer, ColumnSerializer, TicketSerializer
import rest_framework.request
from django.utils import timezone

# Create your views here.
@api_view(['GET', 'POST'])
def get_all_boards(request: rest_framework.request.Request, format=None):
    if request.method == 'POST':
        print(request.data['id'])
        try:
            new_board = Board(boardid = request.data['id'],
                              description = '',
                            title = request.data['title'],
                            creator = '',
                            creation_date = timezone.now(),
                            passwordhash = '',
                            salt = '')
            new_board.save()

            serializer = BoardSerializer(new_board)
            return JsonResponse(serializer.data, safe=False)
        except:
            raise Http404("Board does not exist")
    if request.method == 'GET':
        query_set = Board.objects.all()
        serializer = BoardSerializer(query_set, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET', 'POST'])
def get_board_by_id(request, board_id):
    if request.method == 'POST':
        print("Got POST")         
    if request.method == 'GET':
        try:
            query_set = Board.objects.get(pk=board_id)
        except Board.DoesNotExist:
            raise Http404("Board does not exist")
            
        serializer = BoardSerializer(query_set)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET', 'POST'])
def get_columns_from_board(request, board_id):
    if request.method == 'POST':
        print(request.data['id'])
        try:
            length = len(Column.objects.filter(boardid=board_id))
            print(length)
            new_column = Column(
                boardid = request.data['id'],
                wip_limit = 2,
                color = "white",
                description = "",
                title = request.data['title'],
                ordernum = length + 1,
                creation_date = timezone.now()
                )
            new_column.save()

            serializer = ColumnSerializer(new_column)
            return JsonResponse(serializer.data, safe=False)
        except:
            raise Http404("Board does not exist")
        
    if request.method == 'GET':
        try:
            query_set = Column.objects.filter(boardid=board_id).order_by('ordernum')
        except Board.DoesNotExist:
            raise Http404("Column does not exist") 
        serializer = ColumnSerializer(query_set, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def get_tickets_from_column(request, board_id, column_id):
    query_set = Ticket.objects.filter(columnid=column_id).order_by('order')
    serializer = TicketSerializer(query_set, many=True)
    return JsonResponse(serializer.data, safe=False)
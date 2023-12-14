from django.core import serializers
from django.http import Http404
from .models import Board
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
@api_view(['GET'])
def get_all_boards(request):
    query_set = Board.objects.all()
    data = serializers.serialize("json", query_set)
    return Response(data)

@api_view(['GET'])
def get_board_by_id(request, board_id):
    try:
        query_set = Board.objects.filter(pk=board_id)
    except Board.DoesNotExist:
        raise Http404("Restaurant does not exist")
        
    data = serializers.serialize("json", query_set)
    return Response(data)
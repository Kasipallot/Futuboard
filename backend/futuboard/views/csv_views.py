"""
Views to import and export CSV files of board data
"""
from django.http import HttpResponse
from ..csv_parser import write_csv_header, write_board_data, verify_csv_header, read_board_data
from ..models import Board, Column, Swimlanecolumn, Ticket, User, Usergroup, UsergroupUser
import csv
import io
from rest_framework.decorators import api_view
from django.http import Http404
from ..verification import new_password

@api_view(['GET'])
def export_board_data(request, boardid, filename):
    """
    Export board data to a csv file
    """
    if request.method == 'GET':
        try:
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="' + filename + '.csv"'
            writer = csv.writer(response)
            write_csv_header(writer)
            write_board_data(writer, boardid)
            return response
        except:
            raise Http404("Error exporting board data")
    return HttpResponse('Invalid request')
        

@api_view(['POST'])
def import_board_data(request, boardid):
    """
    Import board data from a csv file
    """
    if request.method == 'POST' and request.FILES['file']:
        csv_file = request.FILES['file']
        if not csv_file.name.endswith('.csv'):
            return HttpResponse('File is not a csv file')
        data_set = csv_file.read().decode('UTF-8')
        io_string = io.StringIO(data_set)
        reader = csv.reader(io_string, delimiter=',', quotechar='"')
        if not verify_csv_header(reader):
            return HttpResponse('Invalid csv file')
        board_title = request.data['title']
        password_hash = new_password(request.data['password'])
        read_board_data(reader, boardid, board_title, password_hash) 
        return HttpResponse('Board data imported')
    return HttpResponse('Invalid request')


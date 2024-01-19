from django.http import Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from .models import Board, Column, Ticket, Usergroup, User, UsergroupUser
from .serializers import BoardSerializer, ColumnSerializer, TicketSerializer, UserSerializer
import rest_framework.request
from django.utils import timezone
from .verification import new_password, verify_password
import uuid

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
                            passwordhash = new_password(request.data['password']),
                            salt = '')
            new_board.save()

            new_usergroup = Usergroup(boardid = new_board, type = 'board')
            new_usergroup.save()

            serializer = BoardSerializer(new_board)
            return JsonResponse(serializer.data, safe=False)
        except:
            raise Http404("Cannot create Board")
    if request.method == 'GET':
        query_set = Board.objects.all()
        serializer = BoardSerializer(query_set, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET', 'POST'])
def get_board_by_id(request, board_id):
    if request.method == 'POST':
        # Get password from request
        password = request.data['password']
        # Get board from database
        try:
            board = Board.objects.get(pk=board_id)
        except Board.DoesNotExist:
            raise Http404("Board does not exist")
        # verify password
        if verify_password(password, board_id, board.passwordhash):
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False})        
    if request.method == 'GET':
        try:
            board = Board.objects.get(pk=board_id)

            # TODO: only return the board if the user is authorized
            # (password is empty of the user has entered the password previously)
            if verify_password("", board_id, board.passwordhash):
                serializer = BoardSerializer(board)
                return JsonResponse(serializer.data, safe=False)
            else:
                # return a 401 if the user does not have access to the board   
                return HttpResponse(status=401)
        except Board.DoesNotExist:
            raise Http404("Board does not exist")

@api_view(['GET', 'POST'])
def get_columns_from_board(request, board_id):
    if request.method == 'GET':
        try:
            query_set = Column.objects.filter(boardid=board_id).order_by('ordernum')
        except Board.DoesNotExist:
            raise Http404("Column does not exist") 
        serializer = ColumnSerializer(query_set, many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        try:
            length = len(Column.objects.filter(boardid=board_id))
            new_column = Column(
                columnid = request.data['columnid'],
                boardid = Board.objects.get(pk=board_id),
                wip_limit = 0,
                color = '',
                description = '',
                title = request.data['title'],
                ordernum = length,
                creation_date = timezone.now()
                )
            new_column.save()

            serializer = ColumnSerializer(new_column)
            return JsonResponse(serializer.data, safe=False)
        except:
            print("Column creation failed")
            raise Http404("Column creation failed")

@api_view(['GET', 'POST', 'PUT'])
def get_tickets_from_column(request, board_id, column_id):
    if request.method == 'PUT':
        try:
            tickets_data = request.data

            # if ticket has a columnid that is not the same as the columnid from the ticket in the database, change it
            for ticket in tickets_data:
                ticket_from_database = Ticket.objects.get(ticketid=ticket['ticketid'])
                if ticket_from_database.columnid != Column.objects.get(pk=column_id):
                    ticket_from_database.columnid = Column.objects.get(pk=column_id)
                    ticket_from_database.save()
                    
            #update order of tickets
            for index, ticket_data in enumerate(tickets_data):
                task = Ticket.objects.get(ticketid=ticket_data['ticketid'])
                task.order = index
                task.save()

            return JsonResponse({"message": "Tasks order updated successfully"}, status=200)
        except Ticket.DoesNotExist:
            raise Http404("Task does not exist")
        except:
            raise Http404("Error updating tasks order.")
    if request.method == 'POST':
        try:
            length = len(Ticket.objects.filter(columnid=column_id))
            new_ticket = Ticket(
                ticketid = request.data['ticketid'],
                columnid = Column.objects.get(pk=column_id),
                title = request.data['title'],
                description = request.data['description'],
                color = 'white',
                storypoints = 8,
                size = int(request.data['size']) if request.data['size'] else 0,
                order = length,
                creation_date = timezone.now()
                )
            
            new_ticket.save()

            serializer = TicketSerializer(new_ticket)
            return JsonResponse(serializer.data, safe=False)
        except:
            raise Http404("Cannot create Ticket")
    if request.method == 'GET':
        try:
            query_set = Ticket.objects.filter(columnid=column_id).order_by('order')
            serializer = TicketSerializer(query_set, many=True)
            return JsonResponse(serializer.data, safe=False)
        except:
            raise Http404("Error getting tickets.") 
@api_view(['PUT'])
def update_ticket(request, column_id, ticket_id):
    try:
        ticket = Ticket.objects.get(pk=ticket_id, columnid=column_id)
    except Ticket.DoesNotExist:
        raise Http404("Ticket not found")

    if request.method == 'PUT':
        try:
            ticket.title = request.data.get('title', ticket.title)
            ticket.description = request.data.get('description', ticket.description)
            ticket.color = request.data.get('color', ticket.color)
            ticket.storypoints = request.data.get('storypoints', ticket.storypoints)
            ticket.size = request.data.get('size', ticket.size)
            ticket.save()

            serializer = TicketSerializer(ticket)
            return JsonResponse(serializer.data, safe=False)
        except:
            raise Http404("Cannot update Ticket")
        
@api_view(['PUT'])
def update_column(request, board_id, column_id):
    try:
        column = Column.objects.get(pk=column_id, boardid=board_id)
    except Column.DoesNotExist:
        raise Http404("Column not found")

    if request.method == 'PUT':
        try:
            column.title = request.data.get('title', column.title)
            
            ticket_ids = request.data.get('ticket_ids')
            
            if ticket_ids is not None and len(ticket_ids) > 0:
                tickets = Ticket.objects.filter(ticketid__in=ticket_ids)
                # TODO: fix this, so that we don't create N queries
                for ticket in tickets:
                    ticket.columnid = column
                    ticket.save()
            column.save()

            serializer = ColumnSerializer(column)
            return JsonResponse(serializer.data, safe=False)
        except:
            raise Http404("Cannot update Column")

@api_view(['GET', 'POST'])
def get_users_from_board(request, board_id):
    if request.method == 'GET':
        try:
            query_set = Usergroup.objects.get(boardid=board_id)
            query_set2 = UsergroupUser.objects.filter(usergroupid=query_set.usergroupid)
            users = [user.userid for user in query_set2]
            serializer = UserSerializer(users, many=True)
        except Board.DoesNotExist:
            raise Http404("Error getting users") 
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        try:
            usergroup = Usergroup.objects.get(boardid=board_id)
            new_user = User(name = request.data['name'],)
            new_user.save()

            new_UsergroupUser = UsergroupUser(usergroupid = usergroup, userid = new_user)
            new_UsergroupUser.save()

            serializer = UserSerializer(new_user)
            return JsonResponse(serializer.data, safe=False)
        except:
            raise Http404("User creation failed")
        
@api_view(['PUT'])
def update_user(request):
    print("TO BE IMPLEMENTED")
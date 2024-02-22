from django.http import Http404
from rest_framework.decorators import api_view
from django.utils import timezone
from django.http import HttpResponse, JsonResponse

from ..models import Board, Column, Swimlanecolumn, Action, Ticket
from ..serializers import SwimlaneColumnSerializer, ActionSerializer


@api_view(['GET', 'POST'])
def swimlanecolumn_view(request, column_id):
    if request.method == 'GET':
        try:
            query_set = Swimlanecolumn.objects.filter(columnid=column_id).order_by('ordernum')
            serializer = SwimlaneColumnSerializer(query_set, many=True)
        except Board.DoesNotExist:
            raise Http404("Error getting swimlane columns") 
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        try:
            length = len(Swimlanecolumn.objects.filter(columnid=column_id))
            new_swimlanecolumn = Swimlanecolumn(
                swimlanecolumnid = request.data['swimlanecolumnid'],
                columnid = Column.objects.get(pk=column_id),
                color = request.data['color'],
                title = request.data['title'],
                ordernum = length
            )
            
            new_swimlanecolumn.save()
            serializer = SwimlaneColumnSerializer(new_swimlanecolumn)
            return JsonResponse(serializer.data, safe=False)
        except:
            raise Http404("Cannot create swinlane column")
        
@api_view(['GET', 'POST', 'PUT'])
def action_view(request, swimlanecolumn_id, ticket_id):
    if request.method == 'PUT':
        try:
            actions_data = request.data

            #change action attributes to new swimlanecolumn and ticket
            for action in actions_data:
                action_from_database = Action.objects.get(actionid=action['actionid'])
                action_from_database.ticketid = Ticket.objects.get(pk=ticket_id)
                action_from_database.swimlanecolumnid = Swimlanecolumn.objects.get(pk=swimlanecolumn_id)
                action_from_database.save()
                    
            #update order of actions
            for index, action_data in enumerate(actions_data):
                action = Action.objects.get(actionid=action_data['actionid'])
                action.order = index
                action.save()
            return JsonResponse({"message": "Action order updated successfully"}, status=200)

        except:
            raise Http404("Cannot update actions")

    if request.method == 'GET':
        try:
            query_set = Action.objects.filter(swimlanecolumnid=swimlanecolumn_id, ticketid=ticket_id).order_by('order')
            serializer = ActionSerializer(query_set, many=True)
        except Board.DoesNotExist:
            raise Http404("Error getting actions") 
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        try:
            length = len(Action.objects.filter(ticketid=ticket_id))
            print(length)
            new_action = Action(
                actionid = request.data['actionid'],
                ticketid = Ticket.objects.get(pk=ticket_id),
                swimlanecolumnid = Swimlanecolumn.objects.get(pk=swimlanecolumn_id),
                title = request.data['title'],
                color = request.data['color'],
                order = length,
                creation_date = timezone.now()
                )
            new_action.save()
            serializer = ActionSerializer(new_action)
            return JsonResponse(serializer.data, safe=False)
        except:
            raise Http404("Cannot create action")
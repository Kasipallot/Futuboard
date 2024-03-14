import csv
import uuid
from futuboard.models import Board, Column, Ticket, User, Usergroup, UsergroupUser, Swimlanecolumn, Action
"""
This file is used to export and import board data to and from a csv file.

The csv file can be used to backup and restore board data.
"""

def write_csv_header(writer):
    """
    Write the header to the csv file, this is used to verify that the csv file is a valid board data file
    """
    writer.writerow(['Futuboard', 'v1.0', 'Board Data'])
    writer.writerow([])

def verify_csv_header(reader):
    """
    Verify that the csv file has the correct header
    """
    header = next(reader)
    if header[0] != 'Futuboard' or header[1] != 'v1.0' or header[2] != 'Board Data':
        return False
    return True

def write_board_data(writer, boardid):
    # Write board data to the csv file
    board = Board.objects.get(boardid=boardid)
    writer.writerow(['Board', board.creator, board.description])
    # Get board usergroups
    usergroup = Usergroup.objects.get(boardid=boardid)
    # Get userids of usergroupuser with usergroupid
    usergroupusers = UsergroupUser.objects.filter(usergroupid=usergroup.usergroupid)
    # Get userids
    for usergroupuser in usergroupusers:
        user = usergroupuser.userid
        writer.writerow(['User', user.name, user.color])
    writer.writerow([])
    # Get all the columns for the board
    columns = Column.objects.filter(boardid=boardid)
    # Write the all the columns to the csv file
    for column in columns:
        #Write the column to the csv file
        writer.writerow(['Column', column.wip_limit, column.color, column.description, column.title, column.ordernum, column.swimlane])
        if column.swimlane:
            # Get all the swimlanecolumns for the column
            swimlanecolumns = Swimlanecolumn.objects.filter(columnid=column.columnid)
            # Write all the swimlanecolumns to the csv file
            for swimlanecolumn in swimlanecolumns:
                writer.writerow(['Swimlanecolumn', swimlanecolumn.color, swimlanecolumn.title, swimlanecolumn.ordernum])
        # Get all the tickets for the column
        tickets = Ticket.objects.filter(columnid=column.columnid)
        # Write all the tickets in the column to the csv file
        for ticket in tickets:
            writer.writerow(['Ticket', ticket.title, ticket.description, ticket.color, ticket.storypoints, ticket.size, ticket.order, ticket.creation_date, ticket.cornernote])
            # Get usergroups with ticketid and boardid
            usergroups = Usergroup.objects.filter(ticketid=ticket.ticketid)
            # Get userids of usergroupuser with usergroupid 
            for usergroup in usergroups:
                usergroupusers = UsergroupUser.objects.filter(usergroupid=usergroup.usergroupid)
                # Get userids
                for usergroupuser in usergroupusers:
                    user = usergroupuser.userid
                    writer.writerow(['User', user.name, user.color])
            if column.swimlane:
                # Get all the actions for the swimlanecolumn
                actions = Action.objects.filter(ticketid=ticket.ticketid)
                # Write all the actions in the swimlanecolumn to the csv file
                for action in actions:
                    writer.writerow(['Action', action.title, action.color, action.order])
                    # Get usergroups with actionid and boardid
                    usergroups = Usergroup.objects.filter(actionid=action.actionid)
                    # Get userids of usergroupuser with usergroupid 
                    for usergroup in usergroups:
                        usergroupusers = UsergroupUser.objects.filter(usergroupid=usergroup.usergroupid)
                        # Get userids
                        for usergroupuser in usergroupusers:
                            user = usergroupuser.userid
                            writer.writerow(['User', user.name, user.color])                
        # Split the columns in the csv file with an empty line
        writer.writerow([])
    return writer

def read_board_data(reader, boardid, board_title, password_hash):
    """
    Read the board data from the csv file and create the board in the database with new ids for all the objects
    except for board which gets its id from the frontend.
    """
    # Get the board data from the csv file, skip the empty line    board_id = uuid.uuid4()
    next(reader)
    board_data = next(reader)
    # Create the board in the database
    board = Board.objects.create(board_id = boardid, title=board_title, creator=board_data[1], description=board_data[2], passwordHash=password_hash)
    # Read the board users from the csv file
    # Create board usergroup
    Usergroupid = uuid.uuid4()
    Usergroup.objects.create(usergroup_id = Usergroupid, board_id = board.id, type = 'board')
    for row in reader:
        # Read users until the next object type is found
        if row[0] == 'User':
            user = User.objects.create(user_id = uuid.uuid4(), name=row[1], color=row[2])
            UsergroupUser.objects.create(usergroup_id = Usergroupid, user_id=user.id)
        else:
            break
    # Read the columns from the csv file
    for row in reader:
        if row[0] == 'Column':
            column = Column.objects.create(column_id = uuid.uuid4(), board_id = board.id, wip_limit=row[1], color=row[2], description=row[3], title=row[4], ordernum=row[5], swimlane=row[6])
            # Read the swimlanecolumns from the csv file
            if column.swimlane:
                for row in reader:
                    if row[0] == 'Swimlanecolumn':
                        Swimlanecolumn.objects.create(swimlanecolumn_id = uuid.uuid4(), column_id = column.id, color=row[1], title=row[2], ordernum=row[3])
                    else:
                        break
            # Read the tickets from the csv file
            for row in reader:
                if row[0] == 'Ticket':
                    ticket = Ticket.objects.create(ticket_id = uuid.uuid4(), column_id = column.id, title=row[1], description=row[2], color=row[3], storypoints=row[4], size=row[5], order=row[6], creation_date=row[7], cornernote=row[8])
                    # Read the ticket users from the csv file
                    for row in reader:
                        usergroupid = uuid.uuid4()
                        Usergroup.objects.create(usergroup_id = usergroupid, ticket_id = ticket.id, type = 'ticket')
                        if row[0] == 'User':
                            user = User.objects.create(user_id = uuid.uuid4(), name=row[1], color=row[2])
                            UsergroupUser.objects.create(usergroup_id = Usergroupid, user_id=user.id)
                        else:
                            break
                    # Read the actions from the csv file
                    if column.swimlane:
                        for row in reader:
                            if row[0] == 'Action':
                                action = Action.objects.create(action_id = uuid.uuid4(), ticket_id = ticket.id, title=row[1], color=row[2], order=row[3])
                                # Read the action users from the csv file
                                for row in reader:
                                    usergroupid = uuid.uuid4()
                                    Usergroup.objects.create(usergroup_id = usergroupid, action_id = action.id, type = 'action')
                                    if row[0] == 'User':
                                        user = User.objects.create(user_id = uuid.uuid4(), name=row[1], color=row[2])
                                        UsergroupUser.objects.create(usergroup_id = Usergroupid, user_id=user.id)
                                    else:
                                        break
                            else:
                                break
                else:
                    break
    return True

    

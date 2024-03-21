import csv
import uuid
from futuboard.models import Board, Column, Ticket, User, Usergroup, UsergroupUser, Swimlanecolumn, Action
from django.utils import timezone
import itertools
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
    # Replace empty strings with None
    for i in range(len(board_data)):
        if board_data[i] == '':
            board_data[i] = None
    board = Board.objects.create(boardid = boardid, title=board_title, creator=board_data[1], description=board_data[2], passwordhash=password_hash, creation_date=timezone.now())
    #print("Added board: ", board)
    # Read the board users from the csv file
    # Create board usergroup
    usergroup = Usergroup.objects.create(usergroupid = uuid.uuid4(), boardid = board, type = 'board')
    #print("Added usergroup: ", usergroup)
    for row in reader:
        #print("USER ROW: ", row)
        # Replace empty strings with None
        for i in range(len(row)):
            if row[i] == '':
                row[i] = None
        # Read users until the next object type is found
        if len(row) > 0 and row[0] == 'User':
            user = User.objects.create(userid = uuid.uuid4(), name=row[1], color=row[2])
            UsergroupUser.objects.create(usergroupid = usergroup, userid=user)
            #print("Added user: ", user)
            #print("Added usergroupuser: ", usergroup)
        else:
            #print("BREAK!")
            break
    # Read the columns from the csv file
    row = next(reader, None)
    while row is not None:
        #print("Got column row: ", row)
        # Empty row = new column
        if(len(row) == 0):
            row = next(reader, None)
            continue
        if row[0] == 'Column':
            # Replace empty strings with None
            for i in range(len(row)):
                if row[i] == '':
                    row[i] = None
            column = Column.objects.create(columnid = uuid.uuid4(), boardid = board, wip_limit=row[1], color=row[2], description=row[3], title=row[4], ordernum=row[5], swimlane=row[6])
            row = next(reader, None)
            # Read the swimlanecolumns from the csv file
            if column.swimlane == "True":
                #print("Swimlane column :", column.swimlane)
                while len(row) > 0 and row[0] == 'Swimlanecolumn':
                    for i in range(len(row)):
                        if row[i] == '':
                            row[i] = None
                    #print("Got swimlanecolumn: ", row)
                    Swimlanecolumn.objects.create(swimlanecolumnid = uuid.uuid4(), columnid = column, color=row[1], title=row[2], ordernum=row[3])
                    row = next(reader, None)
            while len(row) > 0 and row[0] == 'Ticket':
                #print("Got ticket row: ", row)
                # Replace empty strings with None
                for i in range(len(row)):
                    if row[i] == '':
                        row[i] = None
                ticket = Ticket.objects.create(ticketid = uuid.uuid4(), columnid = column, title=row[1], description=row[2], color=row[3], storypoints=row[4], size=row[5], order=row[6], creation_date=row[7], cornernote=row[8])
                # Read the ticket users from the csv file
                usergroup = Usergroup.objects.create(usergroupid = uuid.uuid4(), ticketid = ticket, type = 'ticket')
                row = next(reader, None)
                while len(row) > 0 and row[0] == 'User':
                    #print("Got ticket user: ", row)
                    for i in range(len(row)):
                        if row[i] == '':
                            row[i] = None
                    user = User.objects.create(userid = uuid.uuid4(), name=row[1], color=row[2])
                    UsergroupUser.objects.create(usergroupid = usergroup, userid=user)
                    row = next(reader, None)
                # Read the actions from the csv file
                if column.swimlane == "True":
                    #print("Swimlane column :", column.swimlane)
                    while len(row) > 0 and row[0] == 'Action':
                        #print("Got action: ", row)
                        for i in range(len(row)):
                            if row[i] == '':
                                row[i] = None
                        action = Action.objects.create(actionid = uuid.uuid4(), ticketid = ticket, title=row[1], color=row[2], order=row[3])
                        # Read the action users from the csv file
                        row = next(reader, None)
                        usergroup = Usergroup.objects.create(usergroupid = uuid.uuid4(), actionid = action, type = 'action')
                        while len(row) > 0 and row[0] == 'User':
                            #print("Got action user: ", row)
                            for i in range(len(row)):
                                if row[i] == '':
                                    row[i] = None
                            user = User.objects.create(userid = uuid.uuid4(), name=row[1], color=row[2])
                            UsergroupUser.objects.create(usergroupid = usergroup, userid=user)
                            row = next(reader, None)
        else:
            row = next(reader, None)
            print("GOT INVALID ROW: ", row)
    return True

    

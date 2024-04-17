> [!NOTE]
> The readme is work in progress.

# Introduction

* Our goal is to make a free, easy to use and open source web tool for team workflow management
* The tool has all the required features required for managing workflows without over complicating the tool
* The tool allows for more efficient work in teams where all members are not often in the same space
* Team members can access the team's board remotely.
* Allows for automatic visualizations and statistics about the progress of work.
* Allows for an easier to use platform then alternative tools with the same features.

# Usage

The current version of the tool is found at [the Futuboard Website](https://futuboard.live)

From the front page the user can either create a new blank board or import a new board from a CSV file that has been previously exported using the tool.

When the user creates a new board the tool asks for the name of the board and for an optional password. Creating the board will redirect the user to the newly created board. If the board had a password, then the user will have to enter it first.

## User's manual:
![image](https://github.com/Kasipallot/Futuboard/assets/135588324/89b3a5bd-ee83-4948-ab3c-895d03a2a097)
Picture 1: A screenshot of the user interface

![image](https://github.com/Kasipallot/Futuboard/assets/135588324/7079f7da-731e-4ebb-81ff-4f5d84036702)
Picture 2: Futuboard toolbar

The toolbar contains a home button, that takes the user back to the Futuboard home page. The name of the board is displayed next to the home button. The most important features for the user are the buttons grouped at the top right. The first button allows for the user to create a new user magnet on the board. The second button copies the board link to the clipboard. The third button allows the user to create a new column and the final button opens a drop down box with two features. From the dropdown menu the user export the board data in a CSV file that the user can store locally on a computer. This can be used to create a backup that can be used to create a new board with the same data as the current one.
The user can also delete the current board from here.

![image](https://github.com/Kasipallot/Futuboard/assets/135588324/f523c1ef-8c05-4fd1-b89a-bba6fe89d5c2)

Picture 3: Dropdown menu

![image](https://github.com/Kasipallot/Futuboard/assets/135588324/959d501f-2a97-4611-9759-b143ec1f6abb)

Picture 4: A user on the board which can be connected as a magnet to a ticket or action. The user can be deleted by pressing the switch button on the right of the user list and then clicking on the user.

![image](https://github.com/Kasipallot/Futuboard/assets/135588324/30d953eb-f4b6-4b38-a65f-7aac0853bf82)

Picture 5: After adding a column the user can add tickets by pressing the plus button on the column. Editing tickets is also possible by pressing the edit button.


![image](https://github.com/Kasipallot/Futuboard/assets/135588324/c02087c7-2026-442e-ac08-daea3c5a3d8d)

Picture 6: After pressing the plus button on a column, this form appears which allows you to edit its data. Finalize the creation of the ticket by pressing submit or enter.

![image](https://github.com/Kasipallot/Futuboard/assets/135588324/aa351178-87f0-4a6c-8dd7-cffca260d964)

Picture 7: WIP limits are shown above the tickets. The WIP limit for amount of tickets here is 3 and there are 4 tickets. The limit for storypoints is 45 and currently there are 44 points in the column. If either of these limits are passed, the column turns red.

![image](https://github.com/Kasipallot/Futuboard/assets/135588324/d2836880-656a-4f8a-b664-ebfb894a4121)

Picture 8: You can move tickets between columns by dragging and dropping. The Test 1 ticket from the previous picture has been moved in this picture.

![image](https://github.com/Kasipallot/Futuboard/assets/135588324/4050f4c5-fd05-4dc1-a5b7-75b40e84a76a)


Picture 9: The swimlane can be opened with the arrow button on the column. New actions can be created by pressing the + button on the left side of the opened up swimlane. Actions can be moved by dragging and dropping and they stay in the ticket even when the ticket is moved away from the column containing the swimlanes. A user magnet can be added to an action.







## Features

* The user can create a board with a name and optional password
* The user gets a link to the board, which they have to store personally
* The user can create a Column
* The column can be given a name and whether or not it contains swimlane columns
* After creation the name of the column can be changed
* Tickets can be created in a column
* A tickets name, story points, corner notes, description and color can be chosen.
* Tickets in Columns containing swimlanes can be given actions with descriptions
* Tickets can be moved between columns and columns can be moved
* Actions can be moved between swimlane columns
* Actions, tickets and columns can be deleted
* A user can create new users for the board
* A user magnet can be placed on a ticket or action
* Users, tickets and columns can be deleted, deleting actions has not yet been implemented.
* The data of the board can be exported in a CSV file
* A board can be deleted
* A new board can be imported from a previously exported CSV file

# Instructions for local development

The following sections include information about how to start using the tool in a local development environment and about how the project file structure and libraries work.

## Getting started in a local environment

### Frontend

First make sure that you have at least v20 of node installed on your computer.

After this the frontend can be started using the following commands:
```
npm install
npm run dev
```
To run linting to make sure that the code is written according to the styling standards run:
```
npm run lint
```
To automatically fix detected errors run:
```
npm run lint -- --fix
```

### Backend

First make sure python 3.x is installed. Next we reccommend creating a virtual environment to avoid installing required packages globally.
```
python -m venv /path/to/new/virtual/environment
```
Activate the created virtual environment using:
```
cd .venv/Scripts
activate
```
NOTE: On linux use:
```
source .venv/bin/activate
```
After this you can install required packages by running:
```
cd backend/
pip install -r requirements.txt
```
> [!NOTE]
> Instructions for creating backend .env needs to be added here

After this the backend server can be run using:
```
python3 manage.py runserver 
```
Websockets can be enabled locally using the command below, replace PORT with your desired port.
```
daphne -p PORT backend.asgi:application  
```

## Instructions for future developers

# Technologies

## Frontend

### React - TypeScript

### Vite

### Redux Toolkit - RTK Query

### Styling: MaterialUI

### React-beautiful-dnd

### Testing

### ESLint

## Other technologies

### Backend: Django

### Cloud: Azure

### Database: PostgreSQL

# Architechture

# Quality Goals

## PUBS First

## Definition of done

## Measuring quality

# Deployment instructions

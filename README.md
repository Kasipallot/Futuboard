> [!NOTE]
> The readme is work in progress.

# Introduction

* Our goal is to make a free, easy to use and open source web tool for team workflow management
* The tool has all the required features required for managing workflows without over complicating the tool
* The tool allows for more efficient work in teams where all members are not often in the same space
* Team members can access the team's board remotely.
* Allows for automatic visualizations and statistics about the progress of work.
* Allows for an easier to use platform then alternative tools with the same features.

This README includes a users manual, instructions for setting up development, information about what we've used to create this project with documentation links and guides on deploying your own instance.

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

### Environment variables

You will need an environment variable file (.env) in the frontend folder for the frontend and in the root folder for the backend.

In the frontend folder .env place:
* VITE_DB_ADDRESS = "your backend address"
* VITE_WEBSOCKET_ADDRESS = "your websocket address"

In the backend .env in root place:
* DB_NAME="Your database name"
* DB_USER="Your database user"
* DB_PASSWORD="Your database password"
* DB_HOST="Your database host"
* DB_PORT="Your database port"
* DB_SCHEMA="Your database schema", this is in case two instances of the website with seperate database schemas are needed to run.

Another way for you to get the backend running will be to fix the django database settings to your liking.


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

Here are some technologies used in the project and brief justifications:

## Frontend

### React - TypeScript

React is a popular JavaScript library that offers extensive documentation and flexible interoperability with other libraries.

TypeScript provides type safety and improves the readability and understanding of the program.

[React - Typescript documentation](https://www.typescriptlang.org/docs/handbook/react.html)

### Vite

Vite provides a fast and efficient development environment and an optimized production process for the frontend.

[Vite Guide](https://vitejs.dev/guide/)

### Redux Toolkit - RTK Query

Redux is a state management method familiar to many team members, suitable for scalable project state management needs. Because using Redux can be complex, the Redux Toolkit and RTK Query have been adopted to make the use of Redux smoother and more efficient.

[Redux Toolkit Usage Guide](https://redux-toolkit.js.org/usage/usage-guide)

[RTK Query Overview](https://redux-toolkit.js.org/rtk-query/overview)

### Style Library: MaterialUI

We decided to use a ready-made component library to avoid unnecessary time wastage on styling. MaterialUI allows us to easily give our application a proper appearance.

[MaterialUI documentation](https://mui.com/material-ui/getting-started/)

### React-beautiful-dnd

React beautiful dnd makes it easy to move elements in lists, which should be well-suited for this project. It provides neat animations and extensive documentation.

[React-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

### Frontend testing
For frontend unit tests we use Jest and react-testing-library and for end-to-end testing we use Cypress

### ESLint

ESLint helps developers identify and fix code quality and style issues, ensure compliance with coding standards, and detect errors and bugs in early development stages. It allows teams to define a consistent code style and maintain code quality in their projects.

[ESLint documentation](https://eslint.org/docs/latest/)

## Other Technologies

### Backend technology: Django

Django offers comprehensive documentation and support, scalability, a fast and dynamic framework for software development, and tools for database management and logic building. More specifically the project uses the django-rest-framework.

[Django documentation](https://docs.djangoproject.com/en/5.0/)

[Rest Framework](https://www.django-rest-framework.org/)

### Cloud Service: Azure

Azure provides a scalable and secure cloud for project development. It offers the necessary database options and tools for maintaining web applications. The price level also seems to be affordable in Azure, where there are many free features and $100 free credits are offered to students. The documentation also appeared to be clear.

[Azure Documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

### Database: PostgreSQL

Since we chose Django as our framework, it is natural to select PostgreSQL as our database, as Django provides PostgreSQL-specific tools for communication and numerous data types that operate only in PostgreSQL. Additionally, PostgreSQL offers diverse features that Django supports.

[PostgreSQL documentation](https://www.postgresql.org/docs/)

### Backend Unit Testing: PyTest

We decided to use PyTest for backend unit testing due to its simplicity and previous experience using it.

[PyTest documentation](https://docs.pytest.org/en/7.1.x/contents.html)

# Deployment instructions

Deployment instructions:

Deployment to Azure and other SaaS platforms

## Frontend

Create a new static web app

Use the subscription and resource group of your choice. Name the application as you wish and select a subscription suitable for your use. Choose GitHub as the deployment style and follow Azure's instructions correctly for selecting the GitHub repository.

Choose React as the build preset. Change the App Location to /frontend and the build location to dist.

Advanced settings do not need to be changed.

After this, you can create the application and follow Azure's instructions to completion.

In order for the frontend to function as desired, you still need to add environment variables. For the backend, you need to add the variable VITE_DB_ADDRESS: "your backend address". For websockets, you need to add the variable VITE_WEBSOCKET_ADDRESS: "your websocket address"
These variables can be set, for example, in the GitHub workflow file. Once Azure has completed the deployment, a new workflow file will appear in GitHub (/.github/workflows). An env section needs to be added to this file.

## Backend

Deployment of the backend can be accomplished through Azure's App Service Web App. Create a new Web App. Choose the subscription and resource group you prefer. Also, name your application.

The publish style is code and the runtime stack is Python 3.9. Newer Python versions may not work. After this, choose your preferred region and agreement. Then, from the deployment section, continuous deployment must be activated. Choose the correct GitHub folder for this. After these settings, you are ready to proceed from this view. Leave all other values at their defaults and create the Web App. This will create a new workflow file in GitHub again. At this stage, change all the initial commands in the file’s working-directory: ./backend. Also change the paths in the path to include backend.

Once the Azure deployment is complete, more important settings can be set. From the CORS section, set allowed origins to all (*). However, if the application is no longer in development, set valid CORS values here. If you want to use websockets, add the following command to the startup command section of the configuration: daphne -b 0.0.0.0 -p 8000 backend.asgi:application.

In the environment variables section, you need to include all the used env variables:
![image](https://github.com/Kasipallot/Futuboard/assets/135588324/4679f713-0983-42c3-8ef9-504e134359e3)


DB-prefixed variables are database variables. The value of SCM_DO_BUILD_DURING_DEPLOYMENT should be 1 to ensure the deployment works as intended. After this, restart the application from Azure.

### Database creation

Create a new database using Azure's default settings. After this...
>[!NOTE]
>Someone needs to fill this in!

### Common issues:

If changes are not visible in the backend or it does not work for some reason, it is advisable in Azure to "kill" the application and keep it turned off for about 10 minutes. Then restart it. If you do not wait long enough, the application may not actually have shut down.

## Instruction on how to setup backend.
First step is to install python 3 and setup python virtual environment.
```
python -m venv .venv
```

Using cmd, navigate to recently created folder and run command activate.
```
cd .venv/Scripts
activate
```

Install the python_requirements.txt located in the root of the project. First navigate to the root folder and then run the following command:
```
pip install -r python_requirements.txt
```

Next, you need to install .env file from our team member that contains the username and passwords for connecting to the database. Copy the .env file to the root of the project.

Finally, navigate to the ./backend folder and run the following command
```
manage.py runserver
```
Alternative version for the command if it doesn't work:

```
python manage.py runserver
```
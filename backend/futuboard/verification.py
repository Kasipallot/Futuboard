from argon2 import PasswordHasher
import psycopg2
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
import django.contrib.auth.hashers as hashers
import rest_framework.request

def login(request: rest_framework.request.Request):
    if request.method == 'POST':
        board_id = request.POST['id']
        password = request.POST['password']
        # Verify password
        if verify_password(password, board_id):
            # Give access to board
            user = authenticate(request, username=board_id, password=password)
        else:
            return JsonResponse({'error': 'Invalid login credentials'})
        if user is not None:
            login(request, user)
            # Generate and return an auth token
            token = Token.objects.create(user=user)
            return JsonResponse({'token': token.key})
        else:
            # Return an 'invalid login' error message
            return JsonResponse({'error': 'Invalid login credentials'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
def verify_password(password, id):
    ph = PasswordHasher()
    # Get hash from database for board id
    hash = ''
    try:
        ph.verify(hash, password)
        return True
    except:
        return False
    
def new_password(request):
    if request.method == 'POST':
        board_id = request.POST['id']
        password = request.POST['password']
        # Hash password
        hash_password(password, board_id)
        # Return success message
        return JsonResponse({'success': 'Password set successfully'})
    
def hash_password(password, id):
    ph = PasswordHasher()
    hash = ph.hash(password)
    # Update hash in database for board id
    return

# Planning to use argon2 for hashing passwords with django hashers
# hashers.make_password('password', hasher='argon2')

#hashers.Argon2PasswordHasher.verify('password', encoded)


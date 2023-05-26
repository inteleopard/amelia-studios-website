from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from datetime import datetime, timedelta # create timestamps in different formats
from django.conf import settings
import jwt

# Serializer
from .serializers.common import UserSerializer

# Model
from django.contrib.auth import get_user_model
User = get_user_model()


class RegisterView(APIView):

    def post(self, request):
        user_to_add = UserSerializer(data=request.data)
        try:
            user_to_add.is_valid()
            print("ERRORS ->", user_to_add.errors)
            user_to_add.save()
            return Response({ 'message': 'Registration Successful' }, status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            # similar to pk=pk, here we search for a user by the email field on the model
            # we use the request email as the value, which will return a user record if one exists
            user_to_validate = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied('Invalid credentials')

        # if we get to here, then a user was found in the db matching the email passed
        # we need to check the plain text password against the stored hashed password and we'll use check_password to do it
        if not user_to_validate.check_password(password):
            raise PermissionDenied('Invalid credentials')

        # If we get here, then the user is verified
        # at this point, we want to create a token

        # datetime.now() gives us the timestamp for right now
        # we then add on 3 hours by using timedelta and specifying hours=3
        dt = datetime.now() + timedelta(hours=3)

        # building our token
        token = jwt.encode(
            {
                'sub': user_to_validate.id,
                'exp': int(dt.strftime('%s'))
            },
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        
        return Response({ 'message': f"Welcome back, {user_to_validate.username}", 'token': token }, status.HTTP_202_ACCEPTED)
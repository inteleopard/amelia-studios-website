# BasicAuthentication is the base class that we will inherit as our auth class, and we'll overwrite the default behaviour by using the authenticate method
from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
User = get_user_model()

# import settings
from django.conf import settings

#jwt
import jwt

class JWTAuthentication(BasicAuthentication):

    # the authenticate method overrides the default authentication that is executed when we access any secure route
    def authenticate(self, request):
        # ensure Authorization header exists on the request
        header = request.headers.get('Authorization')

        # check that the header exists, if it doesn't then return None
        if not header:
            return None
        
        # check that the token is the right format, i.e. starts with Bearer
        if not header.startswith('Bearer'):
            raise PermissionDenied(detail="Auth token is invalid")

        # If we get to this point, there was a valid Bearer token, and now we want to remove Bearer from the begininning so we can attempt to decode it with jwt.decode
        token = header.replace('Bearer ', '')

        try:
            # this next line is our attempt to decode the token passed by the user,
            # we need a few things, first argument is the token itself (with Bearer removed)
            # second argument is the secret
            # the third argument is the algorithm
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])

            # if we get to this point, the token is valid, and the payload variable has all the payload information
            user = User.objects.get(pk=payload.get('sub'))

        # this exception is raised when the token is invalid
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied(detail="Invalid token")

        # this exception is raised, when the sub from the payload didn't match a PK on the user table
        except User.DoesNotExist:
            raise PermissionDenied(detail="User not found")

        # if we reach this point, user is authenticated
        # authenticate method requires us to return two-tuple of (user, auth)
        # in our case user is our user variable, and auth is our token variable
        return (user, token)
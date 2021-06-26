import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST


from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .serializers import UserSerializer


class CreateUser(APIView):
    def post(self, request):
        reg_serializer = UserSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save()
            if new_user:
                return Response({'detail': 'User Created'}, status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



def get_csrf(request):
    response = JsonResponse({"Info": "Success - Set CSRF cookie"})
    response["X-CSRFToken"] = get_token(request)
    return response

@require_POST
def login_view(request):

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    if email is None or password is None:
        return JsonResponse(
            {"errors": {"__all__": "Please enter both username and password"}},
            status=400,
        )
    user = authenticate(email=email, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({"detail": "User logged in successfully"})
    return JsonResponse({"detail": "Invalid credentials"}, status=400)


@require_POST
def logout_view(request):
    logout(request)
    return JsonResponse({"detail": "Logout Successful"})


class Me(APIView):

    @staticmethod
    def get(request, format=None):
        if request.user.is_authenticated:
            return Response({request.user.first_name, request.user.last_name})
        return Response({'AnonymousUser'})
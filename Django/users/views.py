import json

from django.contrib.auth import authenticate, login, get_user_model, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

User = get_user_model()

def get_csrf(request):
    response = JsonResponse({"Info": "Success - Set CSRF cookie"})
    response["X-CSRFToken"] = get_token(request)
    return response


@ensure_csrf_cookie
def login_set_cookie(request):
    """
    `login_view` requires that a csrf cookie be set.
    `getCsrfToken` in `auth.js` uses this cookie to
    make a request to `login_view`
    """
    return JsonResponse({"details": "CSRF cookie set"})


# @require_POST
# def login_view(request):
#     print(request)

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


class WhoAmIView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        print(request.user.username)
        return JsonResponse({"username", request.user.username})
from django.http import HttpResponse
from django.shortcuts import redirect


def api_logout_controller():

    # редирект
    response = redirect('/')

    # Удаление авторизационной куки
    response.delete_cookie('authCookie')

    return response

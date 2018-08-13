import json
from django.http import JsonResponse
from booksapp.models import Users
from ...miscutils.sessions import BooksHelpers as helpers


def api_login_controller(request):

    # Если метод не POST
    if request.method != 'POST':
        return JsonResponse({
            'success': False,
            'message': 'Неизвестная ошибка'
        })

    post_values = request.POST
    login_value = post_values.get('login')
    password_value = post_values.get('pass')

    # Если не заполнены поля
    if not login_value or not password_value:
        return JsonResponse({
            'success': False,
            'message': 'Не заполнены логин/пароль'
        })

    hashed_password = helpers.hash_string(password_value)

    # Получение пользователя из БД
    try:
        user = Users.objects.get(user_login=login_value, user_password=hashed_password)
    except Users.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Пользователь не найден в системе'})
    except Exception:
        return JsonResponse({'success': False, 'message': 'Неизвестная ошибка'})

    db_user_login = user.user_login
    db_user_password = user.user_password

    # Если нет совпадения полей в БД
    if login_value != db_user_login or hashed_password != db_user_password:
        return JsonResponse({
            'success': False,
            'message': 'Неправильно заполнены логин/пароль',
            'data': []
        })

    # Корректный результат
    response = JsonResponse({
        'success': True,
        'message': '',
        'data': []
    })

    # Авторизационная кука
    response.set_cookie('authCookie', json.dumps({
        'userName': db_user_login,
        'secretKey': user.user_secret_key
    }))

    return response

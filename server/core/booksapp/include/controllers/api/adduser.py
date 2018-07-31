from django.http import JsonResponse
from booksapp.models import Users
import re


def api_adduser_controller(helpers, sessions, request):

    # Ответ
    response = JsonResponse

    # Пользователь
    user_dict = sessions.check_if_authorized(request, True)

    # Базовые проверки
    base_checks = helpers.base_auth_checks(user_dict, response, True)
    if base_checks is not None:
        return base_checks

    # Если метод не POST
    if request.method != 'POST':
        return JsonResponse({
            'success': False,
            'message': 'Неизвестная ошибка',
            'data': {}
        })

    # Получение данных с сервера
    post_data = request.POST
    user_login = str(post_data.get('userLogin'))
    user_name = str(post_data.get('userName'))
    user_is_admin = False if str(post_data.get('userIsAdmin')) == 'false' else True

    # Если имя/логин не заполнены
    if user_login == '' or user_name == '':
        return response(add_user_standart_json_error('Заполните логин и/или имя'))

    # Проверка логина на существование
    user_exists = False
    try:
        user_to_add = Users.objects.get(user_login=user_login)
        if user_to_add.user_login == user_login:
            user_exists = True
    except Users.DoesNotExist:
        pass
    except Exception:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})

    if user_exists:
        return response(add_user_standart_json_error('Пользователь с данным логином уже существует'))

    # Если логин менее 5 либо более 100 символов или логин состоит не только из латиницы
    if add_user_check_login(user_login) is False:
        return response(add_user_standart_json_error('Логин должен быть не менее 5 и не более 100 символов и состоять из латиницы'))

    # Если имя пустое либо длиннее 100 символов
    if add_user_check_name(user_name) is False:
        return response(add_user_standart_json_error('Имя пользователя должно быть непустым и не длиннее 100 символов'))

    # Генерация секретного ключа
    secret_key = helpers.generate_secret_key()

    # Если все нормально, добавляем пользователя
    is_admin = 'yes' if user_is_admin else 'no'
    user_for_adding = Users(user_login=user_login, user_name=user_name, user_is_admin=is_admin, user_password=helpers.hash_string('Medved'), user_secret_key=str(secret_key))
    try:
        user_for_adding.save()
    except Exception:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})

    # Возврат
    return response({
        'data': {'hasError': False, 'errorText': None},
        'message': None,
        'success': True
    })


def add_user_standart_json_error(error_text):
    return {
        'data': {
            'hasError': True,
            'errorText': error_text
        },
        'message': None,
        'success': True
    }


def add_user_check_login(user_login):
    pattern = re.compile(r"^[a-z][a-z0-9]{4,99}$", re.I | re.S)
    findall_matches = pattern.findall(user_login)
    result = False if len(findall_matches) < 1 else True
    return result


def add_user_check_name(user_name):
    result = False if len(user_name) < 1 or len(user_name) > 100 else True
    return result

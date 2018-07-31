from django.http import JsonResponse
from booksapp.models import Users, Books_2_users
from django.db import IntegrityError, transaction


def api_deleteuser_controller(helpers, sessions, request, user_id):

    # Ответ
    response = JsonResponse

    # Пользователь
    user_dict = sessions.check_if_authorized(request, True)

    # Базовые проверки
    base_checks = helpers.base_auth_checks(user_dict, response, True)
    if base_checks is not None:
        return base_checks

    # Получение информации о пользователе
    unknown_error = response({'success': False, 'message': 'Произошла непредвиденная ошибка'})
    try:
        user_info = Users.objects.get(user_id=user_id)
    except Users.DoesNotExist:
        return unknown_error
    except Exception:
        return unknown_error

    # Нельзя удалить себя
    auth_cookie = request.COOKIES.get('authCookie')
    parsed_cookie = helpers.json2object(auth_cookie)
    cookie_user_login = parsed_cookie.userName

    if user_info.user_login == cookie_user_login:
        response({'success': False, 'message': 'Нельзя удалить себя'})

    # Удаление пользователя отовсюду
    try:
        with transaction.atomic():
            Books_2_users.objects.filter(user_id=int(user_id)).delete()
            Users.objects.filter(user_id=int(user_id)).delete()
    except IntegrityError:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка (при удалении пользователя)'})

    # Возврат, если все нормально
    return response({
        'data': dict(),
        'message': None,
        'isSuccess': True
    })

from django.http import JsonResponse
from booksapp.models import Users
from .adduser import add_user_standart_json_error


def api_getuser_controller(helpers, sessions, request, user_id):

    # Ответ
    response = JsonResponse

    # Пользователь
    user_dict = sessions.check_if_authorized(request, True)

    # Базовые проверки
    base_checks = helpers.base_auth_checks(user_dict, response, True)
    if base_checks is not None:
        return base_checks

    # Получаем информацию по пользователю
    try:
        user_info = Users.objects.get(user_id=int(user_id))
    except Users.DoesNotExist:
        return response(add_user_standart_json_error('Пользователь не найден в системе. Повторите попытку'))
    except Exception:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})

    # Информация по пользователю
    user_data = {
        'userId': user_info.user_id,
        'userLogin': user_info.user_login,
        'userName': user_info.user_name,
        'userIsAdmin': True if user_info.user_is_admin == 'yes' else False
    }

    # Возврат, если все нормально
    return response({
        'data': user_data,
        'message': None,
        'success': True
    })

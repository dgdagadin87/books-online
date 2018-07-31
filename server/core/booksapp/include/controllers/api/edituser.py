from django.http import JsonResponse
from booksapp.models import Users
from .adduser import add_user_standart_json_error, add_user_check_login, add_user_check_name


def api_edituser_controller(helpers, sessions, request, user_id):

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

    # Получаем информацию по пользователю
    try:
        user_info = Users.objects.get(user_id=int(user_id))
    except Users.DoesNotExist:
        return response(add_user_standart_json_error('Пользователь не найден в системе. Повторите попытку'))
    except Exception:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})

    # Если логин менее 5 либо более 100 символов или логин состоит не только из латиницы
    if add_user_check_login(user_login) is False:
        return response(add_user_standart_json_error(
            'Логин должен быть не менее 5 и не более 100 символов и состоять из латиницы'))

    # Если имя пустое либо длиннее 100 символов
    if add_user_check_name(user_name) is False:
        return response(
            add_user_standart_json_error('Имя пользователя должно быть непустым и не длиннее 100 символов'))

    # Если все нормально, добавляем пользователя
    is_admin = 'yes' if user_is_admin else 'no'
    user_for_editing = Users(user_id=user_id, user_login=user_login, user_name=user_name, user_is_admin=is_admin, user_password=user_info.user_password, user_secret_key=user_info.user_secret_key)
    try:
        user_for_editing.save()
    except Exception:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})

    # Возврат, если все нормально
    return response({
        'data': {'hasError': False, 'errorText': None},
        'message': None,
        'success': True
    })

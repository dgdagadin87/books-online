from django.http import JsonResponse
from booksapp.models import Books_2_users


def api_deletemybook_controller(helpers, sessions, request, book_id):

    # Ответ
    response = JsonResponse

    # Пользователь
    user_dict = sessions.check_if_authorized(request, True)
    user_info = user_dict['user']

    # Базовые проверки
    base_checks = helpers.base_auth_checks(user_dict, response)
    if base_checks is not None:
        return base_checks

    # Если все нормально, удаляем книгу
    try:
        Books_2_users.objects.filter(book_id_id=int(book_id), user_id_id=user_info.user_id).delete()
    except Exception:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})

    # Возврат, если все нормально
    return response({
        'data': dict(),
        'message': None,
        'isSuccess': True
    })

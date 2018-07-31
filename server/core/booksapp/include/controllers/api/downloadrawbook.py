from django.http import HttpResponse, JsonResponse
import base64
from booksapp.models import Books, Cached_books


def api_downloadrawbook_controller(helpers, sessions, request, cached_book_id):

    # Ответ
    response = JsonResponse

    # Пользователь
    user_dict = sessions.check_if_authorized(request, True)

    # Базовые проверки
    base_checks = helpers.base_auth_checks(user_dict, response)
    if base_checks is not None:
        return base_checks

    # Получаем контент книги
    try:
        cached_book_object = Cached_books.objects.get(cached_book_id=cached_book_id)
        book_content = cached_book_object.book_content
    except Cached_books.DoesNotExist:
        book_content = 'Not_found'
    except Exception:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})

    # Присваиваем http-ответу необходимые заголовки
    http_response = HttpResponse(str(book_content), content_type='application/octet-stream; charset=utf-8')
    http_response['Content-Disposition'] = 'attachment; filename="' + helpers.translate('Книга') + '.fb2"'

    # Возврат, если все нормально
    return http_response

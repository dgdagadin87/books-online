from django.http import JsonResponse
from booksapp.models import Books, Cached_books
from django.core.mail import EmailMessage


def api_sendtomail_controller(helpers, sessions, request, book_id):

    # Ответ
    response = JsonResponse

    # Пользователь
    user_dict = sessions.check_if_authorized(request, True)

    # Базовые проверки
    base_checks = helpers.base_auth_checks(user_dict, response)
    if base_checks is not None:
        return base_checks

    # Куда отправлять
    email = request.POST.get('email')
    if email is None or email == '':
        return response({'success': False, 'message': 'Укажите адрес электронный почты'})

    # Если все нормально, получаем данные книги
    try:
        book_object = Books.objects.get(book_id=book_id)
        cached_book_id = book_object.cached_book_id_id
        book_name = book_object.book_name
    except Books.DoesNotExist:
        cached_book_id = 0
        book_name = 'Not_found'
    except Exception:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})

    # Получаем контент книги
    try:
        cached_book_object = Cached_books.objects.get(cached_book_id=cached_book_id)
        book_content = cached_book_object.book_content
    except Cached_books.DoesNotExist:
        book_content = 'Not_found'
    except Exception:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})

    # Получаем контент книги
    encoded_content = book_content

    # Имя файла
    file_name = helpers.translate(book_name) + '.fb2'

    # Отправка письма
    message = EmailMessage('Книга "' + book_name + '"', 'Файл книги можно скачать ниже', 'Приложение "Книги" <FromEmail@example.com>', [email])
    message.attach(file_name, encoded_content, 'text/plain')
    try:
        message.send()
    except Exception as e:
        print(e)
        return response({'message': 'При отправке письма произошла непредвиденная ошибка', 'success': False})

    # Возврат, если все нормально
    return response({
        'data': {},
        'message': None,
        'success': True
    })

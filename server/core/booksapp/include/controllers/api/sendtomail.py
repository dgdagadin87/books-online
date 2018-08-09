from booksapp.models import Books, Cached_books
from django.core.mail import EmailMessage
from ...miscutils.sessions import BooksHelpers as helpers
from ...abstract.base_controller2 import BaseController


def api_sendtomail_controller(request, book_id):

    main_controller = SendToMailController('sendToMail', request, False)
    return main_controller.run(book_id)


class SendToMailController(BaseController):

    def run(self, book_id):

        self._error_message = 'Произошла непредвиденная ошибка (отправить на почту)'

        request = self._request

        # Базовые проверки
        self.base_checks()

        # Куда отправлять
        email = request.POST.get('email')
        if email is None or email == '':
            self._set_response_error(message='Укажите адрес электронный почты')
            return self.response_to_client()

        # Если все нормально, получаем данные книги
        try:
            book_object = Books.objects.get(book_id=book_id)
            cached_book_id = book_object.cached_book_id_id
            book_name = book_object.book_name
        except Books.DoesNotExist:
            cached_book_id = 0
            book_name = 'Not_found'
        except Exception:
            self._set_response_error(message=self._error_message)
            return self.response_to_client()

        # Получаем контент книги
        try:
            cached_book_object = Cached_books.objects.get(cached_book_id=cached_book_id)
            book_content = cached_book_object.book_content
        except Cached_books.DoesNotExist:
            book_content = 'Not_found'
        except Exception:
            self._set_response_error(message=self._error_message)
            return self.response_to_client()

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
            self._set_response_error(message='При отправке письма произошла непредвиденная ошибка')
            return self.response_to_client()

        # Возврат, если все нормально
        return self.response_to_client()

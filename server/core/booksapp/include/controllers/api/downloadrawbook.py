from django.http import HttpResponse
from booksapp.models import Cached_books
from ...abstract.base_controller2 import BaseController
from ...miscutils.sessions import BooksHelpers as helpers


def api_downloadrawbook_controller(request, cached_book_id):

    main_controller = DownloadRawBookController('downloadRawBook', request, False)
    return main_controller.run(cached_book_id)


class DownloadRawBookController(BaseController):

    def run(self, cached_book_id):

        self._error_message = 'Произошла непредвиденная ошибка (скачать книгу)'

        # Базовые проверки
        self.base_checks()

        # Получаем контент книги
        try:
            cached_book_object = Cached_books.objects.get(cached_book_id=cached_book_id)
            book_content = cached_book_object.book_content
        except Cached_books.DoesNotExist:
            book_content = 'Not_found'
        except Exception:
            return self.return_error()

        # Присваиваем http-ответу необходимые заголовки
        http_response = HttpResponse(str(book_content), content_type='application/octet-stream; charset=utf-8')
        http_response['Content-Disposition'] = 'attachment; filename="' + helpers.translate('Книга') + '.fb2"'

        # Возврат, если все нормально
        return http_response

from django.http import HttpResponse
from booksapp.models import Books, Cached_books
from ...abstract.base_controller2 import BaseController


def api_downloadbook_controller(request, book_id):

    main_controller = DownloadBookController('downloadBook', request, False)
    return main_controller.run(book_id)


class DownloadBookController(BaseController):

    def run(self, book_id):

        self._error_message = 'Произошла непредвиденная ошибка (скачать книгу)'

        # Базовые проверки
        self.base_checks()

        # Если все нормально, получаем данные книги
        try:
            book_object = Books.objects.get(book_id=book_id)
            cached_book_id = book_object.cached_book_id_id
        except Books.DoesNotExist:
            cached_book_id = 0
        except Exception:
            return self.return_error()

        # Получаем контент книги
        try:
            cached_book_object = Cached_books.objects.get(cached_book_id=cached_book_id)
            book_content = cached_book_object.book_content
        except Cached_books.DoesNotExist:
            book_content = 'Not_found'
        except Exception:
            return self.return_error()

        # Присваиваем http-ответу необходимые заголовки
        http_response = HttpResponse(book_content, content_type='application/octet-stream; charset=utf-8')
        http_response['Content-Disposition'] = 'attachment; filename="Book-for-reading.fb2"'

        # Возврат, если все нормально
        return http_response

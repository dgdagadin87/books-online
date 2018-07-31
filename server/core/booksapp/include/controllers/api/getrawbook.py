from booksapp.models import Cached_books
from ...abstract.base_controller import BaseController
from ...sites.ubooki.controller import UbookiCacheBook


def api_getrawbook_controller(request):

    main_controller = GetRawBookController('getRawBook', request, False)
    return main_controller.run()


class GetRawBookController(BaseController):

    def run(self):
        base_checks = self.base_checks()
        if base_checks is not None:
            return self.response_to_client(base_checks)

        # 0) Если метод не POST
        if self._request.method != 'POST':
            return self.standart_error()

        # 1)Данные из POST
        book_link = str(self._request.POST.get('bookLink'))
        book_author = str(self._request.POST.get('bookAuthor'))
        book_genre = str(self._request.POST.get('bookGenre'))
        book_name = str(self._request.POST.get('bookName'))

        # 2) Берем или создаем книгу и возвращаем ее ИД
        try:
            cached_book_object = Cached_books.objects.get(book_link=book_link)
            return self._return_data(cached_book_object.cached_book_id)
        except Cached_books.DoesNotExist:
            controller = UbookiCacheBook({
                'link': book_link,
                'author': book_author,
                'genre': book_genre,
                'name': book_name
            })
            book_id = controller.cache_book()
            if book_id is False:
                return self._return_data(None, False, 'Ошибка при формировании файла книги')
            else:
                return self._return_data(book_id)
        except Exception:
            return self.standart_error()

    def _return_data(self, book_id, is_success=True, message=None):
        return self.response_to_client({
            'data': {
                'bookId': book_id
            },
            'message': message,
            'success': is_success
        })
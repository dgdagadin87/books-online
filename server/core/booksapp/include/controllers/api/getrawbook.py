import threading
from booksapp.models import Cached_books, Notifications
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
            threading.Thread(target=self._cache_callback, args=(book_link, book_author, book_genre, book_name)).start()
            return self._return_data(None)
        except Exception:
            return self.standart_error()

    def _cache_callback(self, link, author, genre, name):

        controller = UbookiCacheBook({
            'link': link,
            'author': author,
            'genre': genre,
            'name': name
        })

        # cached_book_id
        book_id = controller.cache_book()
        book_id_for_adding = -1 if book_id is False else int(book_id)

        # book_name
        book_name_for_adding = name

        # status
        status_for_adding = 'success' if book_id is not False else 'error'

        # type
        type_for_adding = 'download'

        # is_read
        is_read_for_adding = 'no'

        # Полный объект для добавления
        notification_for_adding = Notifications(cached_book_id_id=book_id_for_adding, book_name=book_name_for_adding, type=type_for_adding, status=status_for_adding, is_read=is_read_for_adding)

        try:
            notification_for_adding.save()
        except Exception as e:
            print('Error for download', e)

    def _return_data(self, book_id, is_success=True, message=None):
        return self.response_to_client({
            'data': {
                'bookId': book_id,
                'hasInCache': False if book_id is None else True
            },
            'message': message,
            'success': is_success
        })
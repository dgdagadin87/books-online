import threading
from booksapp.models import Books, Books_2_users, Cached_books, Notifications
from ...abstract.base_controller2 import BaseController, error_decorator
from ...sites.ubooki.controller import UbookiCacheBook
from ...miscutils.helpers import BooksHelpers


def api_addrawbook_controller(request):

    main_controller = AddRawBookController('addRawBook', request, False)
    return main_controller.run()


class AddRawBookController(BaseController):

    def run(self):

        self._error_message = 'Произошла непредвиденная ошибка (добавить книгу)'

        # Базовые проверки
        self.base_checks()

        # 0) Если метод не POST
        if self._request.method != 'POST':
            return self.return_error()

        # 1)Данные из POST
        book_link = str(self._request.POST.get('bookLink'))
        book_author = str(self._request.POST.get('bookAuthor'))
        book_genre = str(self._request.POST.get('bookGenre'))
        book_name = str(self._request.POST.get('bookName'))

        # 2) Берем или создаем книгу и возвращаем ее ИД
        try:
            cached_book_object = Cached_books.objects.get(book_link=book_link)
            return self._add_to_my_books({
                'book_id': cached_book_object.cached_book_id,
                'book_size': len(cached_book_object.book_content)
            })
        except Cached_books.DoesNotExist:
            # Вызываем асинхронный поток
            '''threading.Thread(target=self._add_callback, args=(book_link, book_author, book_genre, book_name)).start()
            return self._return_data(None)'''
        except Exception:
            return self.return_error()
        '''try:
            cached_book_object = Cached_books.objects.get(book_link=book_link)
            return self._add_to_my_books({
                'book_id': cached_book_object.cached_book_id,
                'book_size': len(cached_book_object.book_content)
            })
        except Cached_books.DoesNotExist:
            controller = UbookiCacheBook({
                'link': book_link,
                'author': book_author,
                'genre': book_genre,
                'name': book_name
            })
            book_data = controller.cache_book(True)
            if book_data is False:
                return self._return_data(False, 'Ошибка при формировании файла книги')
            else:
                return self._add_to_my_books(book_data)
        except Exception as e:
            return self.standart_error(message=e)'''

    def _add_to_my_books(self, cached_book_data):

        cached_book_id = cached_book_data['book_id']
        cached_book_size = cached_book_data['book_size']

        book_exists = True
        try:
            book_object = Books.objects.get(cached_book_id_id=cached_book_id)
        except Books.DoesNotExist:
            book_exists = False
        except Exception as e:
            return self.return_error(message=e)

        user_data = self.get_user_data(True)
        user_id = user_data.user_id

        if book_exists is True:
            book_id = book_object.book_id
            return self._add_book_to_user(book_id, user_id)
        else:
            book_author = str(self._request.POST.get('bookAuthor'))
            book_genre = str(self._request.POST.get('bookGenre'))
            book_name = str(self._request.POST.get('bookName'))

            short_description = BooksHelpers.get_annotation(book_name, book_author, book_genre)
            parent_site_id = 1 # Потом переделать

            book_for_saving = Books(
                book_name=book_name,
                book_author=book_author,
                book_genre=book_genre,
                book_short_desc=short_description,
                cached_book_id_id=cached_book_id,
                parent_site_id_id=parent_site_id,
                book_size=cached_book_size
            )

            try:
                book_for_saving.save()
                latest_book = Books.objects.latest('book_id')
                latest_id = latest_book.book_id
                return self._add_book_to_user(latest_id, user_id)
            except Exception as e:
                return self.return_error(message=e)

    def _add_book_to_user(self, book_id, user_id):
        try:
            Books_2_users.objects.get(book_id_id=book_id, user_id_id=user_id)
            return self._return_data(book_id)
        except Books_2_users.DoesNotExist:
            pass
        except Exception as e:
            return self.return_error(message=e)

        book_for_adding = Books_2_users(book_id_id=book_id, user_id_id=user_id)

        try:
            book_for_adding.save()
            latest_book = Books.objects.latest('book_id')
            latest_id = latest_book.book_id
            return self._return_data(latest_id)
        except Exception as e:
            return self.return_error(message=e)

    def _return_data(self, book_id):
        return self.response_to_client({
            'bookId': book_id,
            'hasInCache': False if book_id is None else True
        })

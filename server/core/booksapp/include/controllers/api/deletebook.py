from booksapp.models import Books, Books_2_users, Cached_books
from django.db import IntegrityError, transaction
from ...abstract.base_controller2 import BaseController


def api_deletebook_controller(request, book_id):

    main_controller = DeleteBookController('deleteBook', request, False)
    return main_controller.run(book_id)


class DeleteBookController(BaseController):

    def run(self, book_id):

        self._error_message = 'Произошла непредвиденная ошибка (удалить книгу)'

        # Базовые проверки
        self.base_checks()

        # Получаем ИД кэшированной книги
        try:
            book_object = Books.objects.get(book_id=book_id)
            cached_book_id = book_object.cached_book_id_id
        except Books.DoesNotExist:
            cached_book_id = 0
        except Exception:
            return self.return_error()

        # Удаляем книгу отовсюду
        try:
            with transaction.atomic():
                Books_2_users.objects.filter(book_id=int(book_id)).delete()
                Books.objects.filter(book_id=int(book_id)).delete()
                Cached_books.objects.filter(cached_book_id=int(cached_book_id)).delete()
        except IntegrityError:
            return self.return_error()

        # Возврат, если все нормально
        return self.response_to_client({})

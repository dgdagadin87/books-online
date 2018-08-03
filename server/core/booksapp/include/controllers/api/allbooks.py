from booksapp.models import Books, Sites
from django.db.models import Q
from math import ceil

from ...abstract.base_controller2 import error_decorator
from .mybooks import MyBooksController


def api_allbooks_controller(request):

    main_controller = AllBooksController('allBooks', request, False)
    return main_controller.run()


class AllBooksController(MyBooksController):

    def run(self):

        self._error_message = 'Произошла непредвиденная ошибка (все книги)'

        # Базовые проверки
        self.base_checks()

        # Объект возврата
        self._return_object = {}

        # Пагинация
        self._set_paging()

        # Фильтр
        self._set_filter()

        # Список
        self._set_collection()

        # Возврат
        return self.response_to_client(self._return_object)

    @error_decorator
    def _set_paging(self):

        request = self._request

        search_term = str(request.GET.get('searchTerm'))

        page = request.GET.get('page')
        page = int(page)

        try:
            books_count = Books.objects.filter(
                Q(book_name__icontains=search_term)
                |
                Q(book_author__icontains=search_term)
                |
                Q(book_genre__icontains=search_term)
                |
                Q(book_short_desc__icontains=search_term)
            ).count()
            books_count = int(books_count)
        except Exception:
            return self._set_response_error(message=self._error_message)

        num_of_pages = 1 if books_count < 1 else ceil(books_count / 10)

        if page < 1:
            page = 1
        elif page > num_of_pages:
            page = num_of_pages

        self._return_object['paging'] = {
            'page': page,
            'pages': num_of_pages,
            'totalCount': books_count
        }

    @error_decorator
    def _set_collection(self):

        if self._return_object['paging'] is None or self._return_object['filter'] is None:
            return

        pagination = self._return_object['paging']
        filter = self._return_object['filter']

        search_term = filter['searchTerm']

        page = pagination['page']

        sites_list = dict()
        sites_collection = Sites.objects.all()
        for current_site in sites_collection:
            sites_list[int(current_site.site_id)] = {
                'site_name': current_site.site_name,
                'site_url': current_site.site_url
            }

        books_list = []

        limit_value = 10 * (page - 1)
        offset_value = 10 * page

        sort_preffix = '' if filter['sortType'] == 'ASC' else '-'

        correct_sort_field = self._get_correct_sort_field(filter['sortField'])

        try:
            books_collection = Books.objects.filter(
                Q(book_name__icontains=search_term)
                |
                Q(book_author__icontains=search_term)
                |
                Q(book_genre__icontains=search_term)
                |
                Q(book_short_desc__icontains=search_term)
            ).order_by(sort_preffix + correct_sort_field)[limit_value:offset_value]
        except Exception:
            return self._set_response_error(message=self._error_message)

        for current_book in books_collection:
            parent_site_id = int(current_book.parent_site_id_id)
            parent_site = sites_list[parent_site_id]

            books_list.append({
                'bookId': current_book.book_id,
                'bookName': current_book.book_name,
                'bookAuthor': current_book.book_author,
                'bookGenre': current_book.book_genre,
                'bookShortDesc': current_book.book_short_desc,
                'bookSize': self._get_size(current_book.book_size),
                'parentSiteUrl': parent_site['site_url'],
                'parentSiteName': parent_site['site_name']
            })

        self._return_object['collection'] = books_list

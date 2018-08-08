from django.db.models import Q
from ...abstract.base_controller2 import BaseController, error_decorator
from booksapp.models import Sites, Books, Books_2_users
from ...sites.ubooki.controller import UbookiCollection


def api_addbook_controller(request):

    main_controller = AddBookController('addBook', request, False)
    return main_controller.run()


class AddBookController(BaseController):

    def run(self):

        self._error_message = 'Произошла непредвиденная ошибка (добавить книгу)'

        # Базовые проверки
        self.base_checks()

        # Объект возврата
        self._return_object = {}

        # список сайтов
        self._set_sites_list()

        # данные пришедшие с клиента
        self._set_client_meta_data()

        # найдено в моих книгах
        self._set_found_in_my()

        # найдено во всех кингах
        self._set_found_in_all()

        # список данных с сайта
        self._set_from_site_data()

        # возвращаемые метаданные
        self._set_filter_and_paging()

        # Возврат
        return self.response_to_client(self._return_object)

    @error_decorator
    def _set_sites_list(self):

        sites_list = []
        try:
            sites_collection = Sites.objects.all()
        except Exception:
            self._set_response_error(message=self._error_message)
            return

        for current_site in sites_collection:
            sites_list.append({
                'id': current_site.site_id,
                'name': current_site.site_name,
                'url': current_site.site_url
            })
        self._return_object['sites'] = sites_list

    @error_decorator
    def _set_found_in_my(self):

        if self._is_first_open():
            self._return_object['isFoundInMy'] = False
            return

        user_info = self._user_data['user']
        search_term = str(self._request.GET.get('searchTerm'))
        try:
            book_ids = Books_2_users.objects.filter(user_id_id=user_info.user_id).distinct().values_list('book_id_id', flat=True)
        except Books_2_users.DoesNotExist:
            book_ids = []
        except Exception:
            self._set_response_error(message=self._error_message)
            return

        try:
            books_count = Books.objects.filter(book_id__in=book_ids).filter(Q(book_name__icontains=search_term)).count()
            books_count = int(books_count)
        except Exception:
            self._set_response_error(message=self._error_message)
            return

        self._return_object['isFoundInMy'] = False if books_count < 1 else True

    @error_decorator
    def _set_found_in_all(self):

        if self._is_first_open():
            self._found_in_my = False
            return

        try:
            search_term = str(self._request.GET.get('searchTerm'))
            books_count = Books.objects.filter(Q(book_name__icontains=search_term)).count()
            books_count = int(books_count)
        except Exception:
            self._set_response_error(message=self._error_message)
            return

        self._return_object['isFoundInAll'] = False if books_count < 1 else True

    def _set_client_meta_data(self):

        search_term = str(self._request.GET.get('searchTerm'))
        page = int(self._request.GET.get('page'))
        selected_site_id = int(self._request.GET.get('selectedSiteId'))

        self._meta = {
            'filter': {
                'searchTerm': search_term,
                'page': page,
                'selectedSiteId': selected_site_id
            },
            'paging': {
                'page': 1,
                'pages': 1,
                'totalCount': 0
            }
        }

    def _set_from_site_data(self):

        self._return_object['collection'] = False

        if self._is_first_open():
            return

        search_term = str(self._request.GET.get('searchTerm'))
        collection_constructor = self._get_site_collection_constructor()
        parser = collection_constructor(search_term)
        collection = parser.get_collection()
        if collection is False:
            self._set_response_error(message=self._error_message)
            return

        self._return_object['collection'] = collection

    def _set_filter_and_paging(self):
        self._return_object['filter'] = self._meta.get('filter')
        self._return_object['paging'] = self._meta.get('paging')

    def _is_first_open(self):
        filter = self._meta.get('filter')
        return True if filter.get('selectedSiteId') == -1 and filter.get('searchTerm') == '' else False

    def _get_site_collection_constructor(self):
        selected_site_id = int(self._request.GET.get('selectedSiteId'))
        if selected_site_id == 1:
            return UbookiCollection

        return UbookiCollection

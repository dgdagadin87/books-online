from django.db.models import Q
from ...abstract.base_controller import BaseController
from booksapp.models import Sites, Books, Books_2_users
from ...sites.ubooki.controller import UbookiCollection


def api_addbook_controller(request):

    main_controller = AddBookController('addBook', request, False)
    return main_controller.run()


class AddBookController(BaseController):

    def run(self):
        base_checks = self.base_checks()
        if base_checks is not None:
            return self.response_to_client(base_checks)

        # 0)Получение списка сайтов
        get_sites_result = self._set_sites_list()
        if get_sites_result is not None:
            return self.standart_error()

        # 1)Получение данных пришедших с клиента
        self._set_client_meta_data()

        # 2)Получение данных по запросу из приложения (мои)
        from_my_result = self._set_found_in_my()
        if from_my_result is not None:
            return self.standart_error()

        # 2)Получение данных по запросу из приложения (все)
        from_all_result = self._set_found_in_all()
        if from_all_result is not None:
            return self.standart_error()

        # 3)Получение данных по запросу с выбранного сайта
        get_data_result = self._set_from_site_data()
        if get_data_result is not None:
            return self.standart_error()

        # 4)Возврат данных
        return self.response_to_client({
            'data': {
                'collection': self._collection,
                'isFoundInMy': self._found_in_my,
                'isFoundInAll': self._found_in_all,
                'sites': self._sites,
                'filter': self._meta.get('filter'),
                'paging': self._meta.get('paging')
            },
            'message': None,
            'isSuccess': True
        })

    def _set_sites_list(self):

        sites_list = []
        try:
            sites_collection = Sites.objects.all()
        except Exception:
            return False

        for current_site in sites_collection:
            sites_list.append({
                'id': current_site.site_id,
                'name': current_site.site_name,
                'url': current_site.site_url
            })
        self._sites = sites_list
        return None

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

    def _set_found_in_my(self):

        if self._is_first_open():
            self._found_in_all = False
            return

        user_info = self._user_data['user']
        search_term = str(self._request.GET.get('searchTerm'))
        try:
            book_ids = Books_2_users.objects.filter(user_id_id=user_info.user_id).distinct().values_list('book_id_id', flat=True)
        except Books_2_users.DoesNotExist:
            book_ids = []
        except Exception:
            return False

        try:
            books_count = Books.objects.filter(book_id__in=book_ids).filter(Q(book_name__icontains=search_term)).count()
            books_count = int(books_count)
        except Exception:
            return False

        self._found_in_my = False if books_count < 1 else True

        return None

    def _set_found_in_all(self):

        if self._is_first_open():
            self._found_in_my = False
            return

        try:
            search_term = str(self._request.GET.get('searchTerm'))
            books_count = Books.objects.filter(Q(book_name__icontains=search_term)).count()
            books_count = int(books_count)
        except Exception:
            return False

        self._found_in_all = False if books_count < 1 else True

        return None

    def _set_from_site_data(self):

        self._collection = False

        if self._is_first_open():
            return None

        search_term = str(self._request.GET.get('searchTerm'))
        collection_constructor = self._get_site_collection_constructor()
        parser = collection_constructor(search_term)
        collection = parser.get_collection()
        if collection == False:
            return False

        self._collection = collection

        return None

    def _is_first_open(self):
        filter = self._meta.get('filter')
        return True if filter.get('selectedSiteId') == -1 and filter.get('searchTerm') == '' else False

    def _get_site_collection_constructor(self):
        selected_site_id = int(self._request.GET.get('selectedSiteId'))
        if selected_site_id == 1:
            return UbookiCollection

        return UbookiCollection

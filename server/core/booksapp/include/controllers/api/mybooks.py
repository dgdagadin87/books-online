from django.http import JsonResponse
from booksapp.models import Books_2_users, Books, Sites
from math import ceil
from django.db.models import Q
from .allbooks import api_allbooks_get_filter, api_allbooks_get_correct_sort_field, api_allbooks_get_size


def api_mybooks_controller(helpers, sessions, request):

    # Ответ
    response = JsonResponse

    # Пользователь
    user_dict = sessions.check_if_authorized(request, True)
    user_info = user_dict['user']

    # Базовые проверки
    base_checks = helpers.base_auth_checks(user_dict, response)
    if base_checks is not None:
        return base_checks

    # Объект ответа
    return_data = dict()

    # Получение полного списка ИД книг
    try:
        book_ids = Books_2_users.objects.filter(user_id_id=user_info.user_id).distinct().values_list('book_id_id', flat=True)
    except Books_2_users.DoesNotExist:
        book_ids = []
    except Exception:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})

    # Получение объекта постраничной навигации
    pagination_data = api_mybooks_get_pagination(request, book_ids)
    if pagination_data is False:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})
    return_data['paging'] = pagination_data

    # Получение объекта фильтра
    filter_data = api_allbooks_get_filter(request, pagination_data)
    return_data['filter'] = filter_data

    # Получение списка книг
    collection_data = api_mybooks_get_collection(filter_data, pagination_data, book_ids)
    if collection_data is False:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})
    return_data['collection'] = collection_data

    # Возврат
    return response({
        'data': return_data,
        'message': None,
        'isSuccess': True
    })


def api_mybooks_get_pagination(request, book_ids):

    search_term = str(request.GET.get('searchTerm'))

    page = request.GET.get('page')
    page = int(page)

    try:
        books_count = Books.objects.filter(book_id__in=book_ids).filter(
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
        return False

    num_of_pages = 1 if books_count < 1 else ceil(books_count/10)

    if page < 1:
        page = 1
    elif page > num_of_pages:
        page = num_of_pages

    return {
        'page': page,
        'pages': num_of_pages,
        'totalCount': books_count
    }


def api_mybooks_get_collection(filter, pagination, book_ids):

    search_term = filter['searchTerm']

    page = int(pagination['page'])

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

    correct_sort_field = api_allbooks_get_correct_sort_field(filter['sortField'])

    try:
        books_collection = Books.objects.filter(book_id__in=book_ids).filter(
            Q(book_name__icontains=search_term)
            |
            Q(book_author__icontains=search_term)
            |
            Q(book_genre__icontains=search_term)
            |
            Q(book_short_desc__icontains=search_term)
        ).order_by(sort_preffix + correct_sort_field)[limit_value:offset_value]
    except Exception:
        return False

    for current_book in books_collection:

        parent_site_id = int(current_book.parent_site_id_id)
        parent_site = sites_list[parent_site_id]

        books_list.append({
            'bookId': current_book.book_id,
            'bookName': current_book.book_name,
            'bookAuthor': current_book.book_author,
            'bookGenre': current_book.book_genre,
            'bookShortDesc': current_book.book_short_desc,
            'bookSize': api_allbooks_get_size(current_book.book_size),
            'parentSiteUrl': parent_site['site_url'],
            'parentSiteName': parent_site['site_name']
        })

    return books_list

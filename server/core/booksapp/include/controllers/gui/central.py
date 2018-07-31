from django.shortcuts import render


def gui_central_controller(books_sessions, request):

    user_dict = books_sessions.check_if_authorized(request)
    user_info = user_dict['user']

    if user_info:
        template = 'main'
    else:
        template = 'login'

    return render(request, 'central/' + template + '.html', {})

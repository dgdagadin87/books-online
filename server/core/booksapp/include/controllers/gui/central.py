from django.shortcuts import render
from ...miscutils.sessions import BooksSessions as sessions


def gui_central_controller(request):

    user_dict = sessions.check_if_authorized(request)
    user_info = user_dict['user']

    if user_info:
        template = 'main'
    else:
        template = 'login'

    return render(request, 'central/' + template + '.html', {})

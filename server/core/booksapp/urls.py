from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$',                               views.gui_central, name='gui_central'),
	url(r'^(allbooks|addbook|users|about)$', views.gui_central, name='gui_central'),
	url(r'^(users/adduser)$',                views.gui_central, name='gui_central'),
	url(r'^(users/edituser/(?P<id>\d+))$',   views.gui_central, name='gui_central'),

	url(r'^api/login$',					   	 views.api_login, name='api_login'),
	url(r'^api/logout$', 				     views.api_logout, name='api_logout'),
	url(r'^api/common$', 				     views.api_common, name='api_common'),
	url(r'^api/allbooks$',				     views.api_allbooks, name='api_allbooks'),
	url(r'^api/mybooks$', 				     views.api_mybooks, name='api_mybooks'),
	url(r'^api/users$', 				     views.api_users, name='api_users'),
	url(r'^api/deletemybook/(?P<id>\d+)$',   views.api_deletemybook, name='api_deletemybook'),
	url(r'^api/deletebook/(?P<id>\d+)$',     views.api_deletebook, name='api_deletebook'),
	url(r'^api/download/(?P<id>\d+)$',       views.api_downloadbook, name='api_downloadbook'),
	url(r'^api/adduser$',                    views.api_adduser, name='api_adduser'),
	url(r'^api/getuser/(?P<id>\d+)$',        views.api_getuser, name='api_getuser'),
	url(r'^api/edituser/(?P<id>\d+)$',       views.api_edituser, name='api_edituser'),
	url(r'^api/deleteuser/(?P<id>\d+)$',     views.api_deleteuser, name='api_deleteuser'),
	url(r'^api/addtomybooks/(?P<id>\d+)$',   views.api_addtomybooks, name='api_addtomybooks'),
	url(r'^api/sendtomail/(?P<id>\d+)$',     views.api_sendtomail, name='api_sendtomail'),
	url(r'^api/addbook$',                    views.api_addbook, name='api_addbook'),
	url(r'^api/getrawbook',                  views.api_getrawbook, name='api_getrawbook'),
	url(r'^api/addrawbook',                  views.api_addrawbook, name='api_addrawbook'),
	url(r'^api/downloadrawbook/(?P<id>\d+)$',views.api_downloadrawbook, name='api_downloadbook'),
	url(r'^test/gettestbook',                views.test_gettestbook, name='test_gettestbook'),
]
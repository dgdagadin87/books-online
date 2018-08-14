from django.db import models


class Settings(models.Model):
	setting_id = models.AutoField(primary_key=True)
	setting_name = models.CharField(max_length=100,unique=True)
	setting_value = models.TextField()


class Sites(models.Model):
	site_id = models.AutoField(primary_key=True)
	site_name = models.CharField(max_length=100, unique=True)
	site_url = models.CharField(max_length=200)


class Users(models.Model):
	user_id = models.AutoField(primary_key=True)
	user_login = models.CharField(max_length=100,unique=True)
	user_name = models.CharField(max_length=100)
	IS_ADMIN_CHOICES = (
		('yes', 'yes'),
		('no', 'no')
	)
	user_is_admin = models.CharField(max_length=3, choices=IS_ADMIN_CHOICES, default='no')
	user_password = models.CharField(max_length=100)
	user_secret_key = models.CharField(max_length=100, default='qwerty')


class Cached_books(models.Model):
	cached_book_id = models.AutoField(primary_key=True)
	book_link = models.CharField(max_length=100,unique=True)
	book_content = models.TextField()


class Books(models.Model):
	book_id = models.AutoField(primary_key=True)
	book_name = models.CharField(max_length=200)
	book_author = models.CharField(max_length=200)
	book_genre = models.CharField(max_length=200)
	book_short_desc = models.TextField()
	book_size = models.BigIntegerField()
	parent_site_id = models.ForeignKey(
		Sites,
		on_delete=models.CASCADE
	)
	cached_book_id = models.ForeignKey(
		Cached_books,
		on_delete=models.CASCADE
	)

	class Meta:
		unique_together = (('book_id', 'parent_site_id'), ('book_id', 'cached_book_id'))


class Books_2_users(models.Model):
	books_2_users_id = models.AutoField(primary_key=True)
	book_id = models.ForeignKey(
		Books,
		on_delete=models.CASCADE
	)
	user_id = models.ForeignKey(
		Users,
		on_delete=models.CASCADE
	)

	class Meta:
		unique_together = ('book_id', 'user_id')


class Notifications(models.Model):
	notification_id = models.AutoField(primary_key=True)
	STATUS_CHOICES = (
		('success', 'success'),
		('error', 'error')
	)
	status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='error')
	cached_book_id = models.ForeignKey(
		Cached_books,
		on_delete=models.DO_NOTHING
	)
	book_name = models.CharField(max_length=200)
	TYPE_CHOICES = (
		('add', 'add'),
		('download', 'download')
	)
	type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='download')
	IS_READ_CHOICES = (
		('yes', 'yes'),
		('no', 'no')
	)
	is_read = models.CharField(max_length=3, choices=IS_READ_CHOICES, default='no')

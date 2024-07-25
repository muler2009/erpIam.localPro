from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin
from .models import PosixGroupUserModel

admin.site.register(PosixGroupUserModel)
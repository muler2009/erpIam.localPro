from django.contrib import admin
from iam.models import UserAccountsModel

admin.site.register(UserAccountsModel)
# Register your models here.
# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from .models import UserAccountsModel

# class CustomUserAdmin(UserAdmin):
#     model = UserAccountsModel
#     list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active',)
#     list_filter = ('is_staff', 'is_active',)
#     fieldsets = (
#         (None, {'fields': ('username', 'email', 'password')}),
#         ('Personal Info', {'fields': ('first_name', 'last_name')}),
#         ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_active', 'is_superuser')}
#         ),
#     )
#     search_fields = ('email', 'username',)
#     ordering = ('email',)

# admin.site.register(UserAccountsModel, CustomUserAdmin)

# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from .models import UserAccountsModel

# class CustomUserAdmin(UserAdmin):
#     model = UserAccountsModel
#     list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active',)
#     list_filter = ('is_staff', 'is_active',)
#     fieldsets = (
#         (None, {'fields': ('username', 'email', 'password')}),
#         ('Personal Info', {'fields': ('first_name', 'last_name')}),
#         ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_active', 'is_superuser')}
#         ),
#     )
#     search_fields = ('email', 'username',)
#     ordering = ('email',)
#     filter_horizontal = ('groups', 'user_permissions',)

# admin.site.register(UserAccountsModel, CustomUserAdmin)
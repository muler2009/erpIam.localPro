from django.contrib import admin
from iam.models import UserAccountsModel
from easyaudit.models import LoginEvent

class LoginEventAdmin(admin.ModelAdmin):
    list_display = ('user_display', 'datetime', 'remote_ip',)
    search_fields = ('user__email',)
    actions = None
    view_on_site = False

    def user_display(self, obj):
        return obj.user.email if obj.user else 'Anonymous'
    user_display.short_description = 'User'

admin.site.unregister(LoginEvent)  

admin.site.register(UserAccountsModel)
admin.site.register(LoginEvent, LoginEventAdmin)

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
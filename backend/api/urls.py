from django.contrib import admin
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('ldap/', include('directoryService.iam.urls')),
    path('account/', include('users.urls')),
    path('groups/', include('groups.urls')),
    path('dms/', include('dmsmodule.urls')),


    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

    


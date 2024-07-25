from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    # path('ldap/', include('directoryService.iam.urls')),
    path('dms/', include('dmsmodule.urls')),
    path('iam/', include('iam.urls') )
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))

]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    


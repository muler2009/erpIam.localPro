from django.urls import path, include


urlpatterns = [
    path('folder/', include('dmsmodule.folder.urls'))
]
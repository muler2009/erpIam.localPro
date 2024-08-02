from django.urls import path, include


urlpatterns = [
    path('folder/', include('dmsmodule.folder.urls')),
    path('file/', include('dmsmodule.file_mangement.urls')),

    
]
from django.urls import path, include

urlpatterns = [
    path('groups/', include('iam.groups.urls')),
    path('account/', include('iam.users.urls')),
    path('role/', include('iam.role.urls')),
    path('policy/', include('iam.policy.urls', namespace='policy')),
    path('', include('iam.auditing.urls', namespace='audititng')),

    path('profile/', include('iam.user_profile.urls')),

]

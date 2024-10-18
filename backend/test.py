from django.urls import get_resolver
resolver = get_resolver(urlconf='iam.groups.urls')

for url_pattern in resolver.url_patterns:
    print(url_pattern)
from django.conf import settings
import ldap

class LDAPConnectionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.connection = None

    def __call__(self, request):
        try:
            # Read LDAP configuration from Django settings
            ldap_uri = settings.LDAP_URI
            ldap_bind_dn = settings.LDAP_BIND_DN
            ldap_bind_password = settings.LDAP_PASSWORD

            # Initialize and bind to the LDAP server
            connection = ldap.initialize(ldap_uri)
            connection.bind(ldap_bind_dn, ldap_bind_password)

            # Attach the connection to the request object
            request.ldap_connection = connection
        except ldap.LDAPError as exc:
            # Log the error or handle it as needed
            request.ldap_connection = None
            # Optionally, you could raise an error or handle it differently
            raise(f"LDAP connection error: {exc}")
        except ldap.INVALID_CREDENTIALS:
            raise ConnectionError("Invalid credentials.")
        except ldap.ALREADY_EXISTS:
            raise ConnectionError("Object already exists.")
        except ldap.SERVER_DOWN as exc:
            raise ldap.SERVER_DOWN("Server is down.") 
        except ldap.LDAPError as e:
            raise ConnectionError(str(e), code=500)

        response = self.get_response(request)

        # Clean up resources
        if hasattr(request, 'ldap_connection'):
            request.ldap_connection.unbind()

        return response

from ldap import initialize, LDAPError, CONNECT_ERROR, INVALID_CREDENTIALS, ALREADY_EXISTS, SERVER_DOWN
from ldap.ldapobject import SimpleLDAPObject
from rest_framework.response import Response
from rest_framework.exceptions import APIException


class LDAPConnection:   
    def __init__(self, ldap_uri='ldap://localhost:389'):
        self.ldap_uri = ldap_uri
        self.connection = None

    def connect_ldap_server(self):
        """
            instance method for to initialize and bind with the LDAP server with 
            credentials distinguished name and password
        """
        try:
            # self.connection = SimpleLDAPObject(self.ldap_uri) 
            self.connection = initialize(self.ldap_uri)           
            if not self.connection:
                raise ConnectionError("Unable to connect to the server!")
            
            success = self.connection.bind("cn=admin,dc=erpIam,dc=local", 'password')     
                 
            if success == False: 
                raise ConnectionError("Invalid credentials.")
            
            return self.connection
        
        except INVALID_CREDENTIALS:
            raise ConnectionError("Invalid credentials.")
        except ALREADY_EXISTS:
            raise ConnectionError("Object already exists.")
        except SERVER_DOWN as exc:
            raise SERVER_DOWN("Server is down.") 
        except LDAPError as e:
            raise ConnectionError(str(e), code=500)
            

    def close_ldap_server(self):
        """
            unbind the connection when operation done
        """
        if self.connection:
            self.connection.unbind_s()
 
 
 
 
 
 
 
 
 
 
 
 
 
 
        
          
    # def __init__(self,ldap_uri='ldap://localhost:389', trace_level = 2, retry_max = 3, retry_delay= 0.01, byte_mode = False) -> None:
    #     self.ldap_uri = ldap_uri # instance variable for server uniform resource identifier 
    #     self.connection = None   # an object for LDAPObject 
    #     self.trace_level = trace_level # the level of trace information to output for debugging purposes
    #     self.retry_max = retry_max # indicating the maximum number of times to retry a connection incase initial conneciton fails
    #     self.retry_delay = retry_delay # the delay in seconds between connection retry attempts 
    #     self.byte_mode = byte_mode 
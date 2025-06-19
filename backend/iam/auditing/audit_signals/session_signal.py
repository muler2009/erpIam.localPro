from django.dispatch import Signal

user_logged_in_session_tracker = Signal() # custom signal on successful signal 
user_logged_out_session = Signal() # custom signal for logout



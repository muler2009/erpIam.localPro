
from django.utils.timezone import timedelta

AXES_ENABLED = True  # axes enables for the appliation
AXES_COOLOFF_TIME = timedelta(hours=1)  # Lockout duration
AXES_FAILURE_LIMIT = 1 # number of trial
AXES_LOCK_OUT_AT_FAILURE = True  # After the number of allowed login attempts are exceeded, should we lock out this IP
AXES_LOCKOUT_PARAMETERS = ['username']  # Lockout based on username and IP address
AXES_RESET_ON_SUCCES = False  # If True, a successful login will reset the number of failed logins.
AXES_HANDLER = 'axes.handlers.database.AxesDatabaseHandler'  # More stable



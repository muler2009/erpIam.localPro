import random 
import string

def set_default_password():
    chars = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(chars) for i in range(10))
    print(password)
    return password

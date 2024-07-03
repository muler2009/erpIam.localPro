import string
import random

print(string.ascii_letters)
print(string.digits)
print(string.punctuation)

chars = string.ascii_letters
chars += string.digits
chars += string.punctuation

password = ''.join([random.choice(chars) for i in range(8)])
print(f"Your Password is {password}")
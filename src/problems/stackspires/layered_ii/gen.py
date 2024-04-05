import random
import string

def generate_random_string(n):
    j = 19
    random_string = ''
    for _ in range(n):
        random_letter = random.choice(string.ascii_uppercase)
        random_string += random_letter * random.randint(1, j)
        if random.random() < 0.25:
            if random.random() < 0.5:
                new_random = random.choice(string.ascii_uppercase)
                random_string += random_letter * random.randint(1, j)
            random_string += random_letter * random.randint(1, j)
    return random_string

n = 5000  # Size of the random string
k = 7


random_string = generate_random_string(n)
print(k)
print(random_string)

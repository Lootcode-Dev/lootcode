import random
import string

def generate_random_string(n):
    random_string = ''
    for _ in range(n):
        random_letter = random.choice(string.ascii_uppercase)
        random_string += random_letter
        if random.random() < 0.25:
            if random.random() < 0.5:
                new_random = random.choice(string.ascii_uppercase)
                random_string += new_random
                random_string += new_random
            random_string += random_letter
    return random_string

n = 52  # Size of the random string

random_string = generate_random_string(n)
print(random_string)

import random

def generate_random_numbers(n, x, y):
    random_numbers = []
    for _ in range(n):
        random_numbers.append(random.randint(x, y))
    return random_numbers

n = 100  # Number of random numbers to generate
x = 1   # Lower bound
y = 100000 # Upper bound

random_numbers = generate_random_numbers(n, x, y)
numbers_string = ' '.join(map(str, random_numbers))

print(n)
print(numbers_string, end='')

import random

def generate_random_numbers(n, i, j):
    random_numbers = []
    for _ in range(n):
        random_numbers.append(random.randint(i, j))
    return random_numbers

n = 28  # Number of random numbers
i = 1   # Lower bound
j = 4 # Upper bound

random_numbers = generate_random_numbers(n, i, j)
print(len(random_numbers))
print(*random_numbers, sep=" ")
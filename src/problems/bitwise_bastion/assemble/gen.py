import random

def generate_unique_numbers(n, i, j):
    numbers = set()
    while len(numbers) < n:
        numbers.add(random.randint(i, j))
    return list(numbers)

n = 15  # Number of random numbers to generate
i = 1   # Lower bound of the range
j = 16 # Upper bound of the range
t = 1000  # Target sum

unique_numbers = generate_unique_numbers(n, i, j)
print(len(unique_numbers))
print(t)
print(*unique_numbers, sep=' ')
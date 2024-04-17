import random

def generate_random_numbers(n, j, k):
    numbers = [random.randint(j, k) for _ in range(n)]
    return numbers

n = 10110  # Number of random numbers
j = 1   # Lower bound
k = 100000 # Upper bound

random_numbers = generate_random_numbers(n, j, k)

print(n)
for number in random_numbers:
    print(number)
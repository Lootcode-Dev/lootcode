import random

def generate_random_numbers(n, j, k):
    random_numbers = []
    for _ in range(n):
        random_numbers.append(random.randint(j, k))
    return random_numbers

n = 10121  # Number of random numbers to generate
j = 1   # Lower bound
k = 41245 # Upper bound

random_numbers = generate_random_numbers(n, j, k)
print(n)
print(*random_numbers, sep="\n")
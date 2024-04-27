import random

def generate_random_numbers(n, i, j):
    numbers = random.sample(range(i, j+1), n)
    return numbers

def assign_random_number(numbers):
    m = random.choice(numbers)
    return m

# Example usage
n = 3
i = 1
j = 9

random_numbers = generate_random_numbers(n, i, j)
m = assign_random_number(random_numbers)

print(n, m)
print(" ".join(map(str, random_numbers)))
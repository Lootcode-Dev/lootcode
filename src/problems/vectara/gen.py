import random

def generate_random_numbers(n, x, y):
    random_numbers = []
    for _ in range(n):
        random_numbers.append(random.randint(x, y))
    return random_numbers

n = 100  # Number of random numbers to generate
x = 0   # Lower bound
y = 1 # Upper bound
z = 50 # Segment size
# j = 1   # Lower bound for segment size
# k = 10  # Upper bound for segment size
# z = random.randint(j, k)

random_numbers = generate_random_numbers(n, x, y)
numbers_string = ' '.join(map(str, random_numbers))

print(n, z)
print(numbers_string, end='')

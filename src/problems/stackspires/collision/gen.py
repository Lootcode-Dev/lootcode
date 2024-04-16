import random

def generate_random_numbers(n, x, y):
    random_numbers = []
    for _ in range(n):
        number = random.randint(x, y)
        while number == 0:
            number = random.randint(x, y)
        random_numbers.append(number)
    return random_numbers

n = 99  # Number of random numbers to generate
x = -17  # Lower bound (negative)
y = 15  # Upper bound

random_numbers = generate_random_numbers(n, x, y)
numbers_string = ' '.join(map(str, random_numbers))

print(n)
print(numbers_string, end='')

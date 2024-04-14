import random

def generate_distinct_numbers(n, i, j):
    numbers = list(range(i, j+1))
    random.shuffle(numbers)
    return numbers[:n]

n = 1234
i = 1
j = 4568

distinct_numbers = generate_distinct_numbers(n, i, j)
print(n)
print(*distinct_numbers, sep=" ")
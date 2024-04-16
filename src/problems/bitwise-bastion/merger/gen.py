import random

def generate_random_pairs(n, j, k):
    for _ in range(n):
        x = random.randint(j, k)
        y = random.randint(j, k)
        print(x, y)

# Example usage
n = 9162
j = 1
k = 50000
print(n)
generate_random_pairs(n, j, k)
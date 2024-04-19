import random

def generate_random_list(n, j, k):
    random_list = [random.randint(j, k) for _ in range(n)]
    return list(set(random_list))

n = 999  # Replace with your desired number of elements
j = 1000   # Replace with the starting value of the range
k = 1000000 # Replace with the ending value of the range
random_list = generate_random_list(n, j, k)
print(len(random_list))
print(*random_list, sep=' ')
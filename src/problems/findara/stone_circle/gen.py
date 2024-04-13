import random

def generate_random_numbers(n, i, j, t):
    # Generate n random numbers between i and j
    numbers = [random.randint(i, j) for _ in range(n)]
    
    # Replace an element with t with 50% chance
    if random.random() < 0.5:
        replace_index = random.randint(0, n-1)
        numbers[replace_index] = t
    else:
        # Replace all instances of t with different numbers
        for index, num in enumerate(numbers):
            if num == t:
                new_num = random.randint(i, j)
                while new_num == t:
                    new_num = random.randint(i, j)
                numbers[index] = new_num
    
    # Sort the numbers
    numbers.sort()
    
    # Rotate the numbers by a random amount
    rotate_amount = random.randint(1, n-1)
    numbers = numbers[rotate_amount:] + numbers[:rotate_amount]
    
    
    return numbers

# Example usage
n = 56789
i = 1
j = 100000
t = 9876
random_numbers = generate_random_numbers(n, i, j, t)
print(n, t)
print(*random_numbers, sep=" ")
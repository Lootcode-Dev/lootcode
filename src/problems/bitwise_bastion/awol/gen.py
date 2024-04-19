import random

def generate_and_shuffle(n):
    # Generate the array of numbers from 0 to n
    numbers = list(range(n+1))
    
    # Shuffle the array
    random.shuffle(numbers)
    
    # Randomly remove one number
    removed_number = numbers.pop(random.randint(0, len(numbers)-1))
    
    return numbers, removed_number

# Example usage
n = 9
shuffled_array, removed_number = generate_and_shuffle(n)
print(len(shuffled_array))
print(*shuffled_array, sep=' ')
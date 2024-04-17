import random

def generate_random_numbers(j, k):
    num1 = ""
    num2 = ""
    num1 += str(random.randint(1, 9))
    num2 += str(random.randint(1, 9))
    
    for _ in range(j-1):
        num1 += str(random.randint(0, 9))

    for _ in range(k-1):
        num2 += str(random.randint(0, 9))
    
    return num1, num2


# Example usage
j = 8
k = 10000
num1, num2 = generate_random_numbers(j, k)
print(num1, num2)
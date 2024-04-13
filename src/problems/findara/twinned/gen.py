import random

def generate_random_list(n, i, j):
    random_list = []
    generated_numbers = set()
    while len(random_list) < n:
        new_random_number = random.randint(i, j)
        if new_random_number not in generated_numbers:
            random_list.append(new_random_number)
            generated_numbers.add(new_random_number)

    if random.random() < 0.5:
        random_number = random_list[0]
        random_list[-1] = random_number * 2
    else:
        random_number = random_list[0]
        # Replace all instances of random_number * 2 from the list
        for index, num in enumerate(random_list):
            if num == random_number * 2:
                new_random_number = random.randint(i, j)
                while new_random_number == random_number:
                    new_random_number = random.randint(i, j)
                random_list[index] = new_random_number
        # Output true to the terminal
        print("YES")

    random.shuffle(random_list)
    return random_list



# Example usage
n = 10  # Number of random integers
i = 1   # Lower bound
j = 11 # Upper bound

random_list = generate_random_list(n, i, j)
print(len(random_list))
print(*random_list, sep=" ")

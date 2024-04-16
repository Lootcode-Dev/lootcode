import random

def generate_random_times(n):
    times = set()  # Use a set to store unique times
    while len(times) < n:
        hour = random.randint(0, 23)
        minute = random.randint(0, 59)
        time = f"{hour:02d}:{minute:02d}"
        times.add(time)
    return list(times)  # Convert set back to a list

n = 13  # Number of random times to generate
random_times = generate_random_times(n)
print(n)
print(*random_times, sep="\n")
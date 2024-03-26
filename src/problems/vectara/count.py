import os

directory = "./elections/input/"

# Get a list of all files in the directory
files = os.listdir(directory)

# Sort the files alphabetically
files.sort()

for filename in files:
    if filename.endswith(".in"):
        filepath = os.path.join(directory, filename)
        with open(filepath, "r") as file:
            numbers = file.read().split()
            num_numbers = len(numbers)
            print(f"The file {filename} contains {num_numbers} numbers.")
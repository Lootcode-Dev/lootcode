# Read the input file
with open('./reallocation/input/i.in', 'r') as file:
    lines = file.read()

# Create a space between each character in the string
lines = ' '.join(lines)

# Remove only the first space
lines = lines.replace(' ', '', 1)

# Print the string
print(len(lines), 100, end="")
print(lines, end='')
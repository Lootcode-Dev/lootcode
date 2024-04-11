def isHappy(n):
    current_number = n
    number = 0
    numbers = {}
        
    while True:
        for i in str(current_number):
            number += int(i) ** 2
        if number == 1:
            return True
        if number in numbers:
            return False
        numbers[number] = 0
        current_number = number
        number = 0

n = int(input())

beauty = []
for i in range(n):
    number = int(input())
    if isHappy(number):
        beauty.append(number)

print(len(beauty))
print(*beauty, sep="\n")
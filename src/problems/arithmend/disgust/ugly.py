def isUgly(n):
    while n >= 1:
        if n%2 == 0:
                n=n//2
        elif n%3 == 0:
            n=n//3
        elif n%5 == 0:
            n=n//5
        elif n == 1:
            return True
        else:
            return False
    return False 

n = int(input())

beauty = []
for i in range(n):
    number = int(input())
    if isUgly(number):
        beauty.append(number)

print(len(beauty))
print(*beauty, sep="\n")
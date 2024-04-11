def trailingZeroes(n):
    i=1
    count=0
    while n//pow(5,i):
        count+=n//pow(5,i)
        i+=1
    return count

n = int(input())
print(trailingZeroes(n))
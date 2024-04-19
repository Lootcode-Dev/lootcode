def getSum(a, b):
    bitShort = 0xffffffff 

    while b & bitShort != 0:
        carry = (a & b) << 1
        a = a ^ b
        b = carry

    return a & bitShort if b > 0 else a

n = int(input())
for _ in range(n):
    a, b = map(int, input().split())
    print(getSum(a, b))
n = int(input())
arr = list(map(int, input().split()))

arr = sorted(arr, key=lambda x: (bin(x).count('1'), x))

print(*arr, sep=' ')
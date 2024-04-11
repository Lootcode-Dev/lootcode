def missingNumber(nums):
    res = 0
    for n in range(1, len(nums)+1):
        res ^= n
        res ^= nums[n-1]
    return res

n = int(input())
nums = list(map(int, input().split()))
print(missingNumber(nums))
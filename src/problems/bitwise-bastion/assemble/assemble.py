def get_subsequence_sum(arr, target):
    n = len(arr)
    subsets = []
    for i in range(1, 2**n):
        subset_sum = 0
        subset = []
        for j in range(n):
            if (i >> j) & 1:
                subset_sum += arr[j]
                subset.append(arr[j])
        if subset_sum == target:
            subsets.append(subset)
    return subsets

# Example usage
n = int(input())
target = int(input())
arr = list(map(int, input().split()))

subsets = get_subsequence_sum(arr, target)
subsets = sorted(subsets)
if len(subsets) == 0:
    print("NO")
else:
    print("YES")

for subset in subsets:
    print(*subset, sep=" ")

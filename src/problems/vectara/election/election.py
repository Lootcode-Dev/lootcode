from collections import defaultdict

nums = input().split()
vals = [int(i) for i in nums]

vMap = defaultdict(int)

# Create map
for val in vals:
    vMap[val] += 1

# Sort map
results = sorted(vMap.items(), key=lambda i: i[1])
results = results[::-1]
print(results)
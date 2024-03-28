n = input()
nums = input().split()
nums = [int(x) for x in nums]

ans = 1
count = 1
max_count = 1
max_index = 0

for i in range(1, len(nums)):
    if nums[i] > nums[i - 1]:
        count += 1
        if count > max_count:
            max_count = count
            max_index = i
    else:
        count = 1

subsequence = nums[max_index - max_count + 1: max_index + 1]
ans = max_count  # Update the value of ans to max_count

growths = []
for i in range(len(subsequence) - 1):
    growth = subsequence[i + 1] - subsequence[i]
    growths.append(growth)

print("Length:", ans)
print("Segment:", end=" ")
print(*subsequence, sep=" ")
print("Average Growth: {:.2f}".format(sum(growths)/len(growths)), end=" ")

inp = input().split()
n = int(inp[0])
m = int(inp[1])

numbers = list(map(int, input().split()))

max_sum = float('-inf')
start_index = 0

for i in range(n - m + 1):
    segment_sum = sum(numbers[i:i+m])
    if segment_sum > max_sum:
        max_sum = segment_sum
        start_index = i

print(start_index)
# Print the sum of the segment
print(max_sum, end="")
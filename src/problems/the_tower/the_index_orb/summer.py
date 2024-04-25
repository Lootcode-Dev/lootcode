# UCF HSPT 2024: 1999, Bizarre Summer
# Solution by Brian Grana

# Solution Idea:
#   Let's imagine we just have two numbers in the array
#   If the first value is positive, it will keep getting
#   added to the second value until that value becomes
#   positive. This will always happen no matter how negative
#   the second number is. A similar process occurs if the
#   first number is negative.
#
#   This will become a chain reaction throughout the array, as once
#   the second number becomes positive, it and the first element will now
#   add to the third element, and so on. This indicates that the sign of
#   the first element eventually determines the sign of the last one.
#
#   However, if the first element is 0, it won't add anything to the
#   next element and thus it will have no influence on the sign of
#   the final element. The last observation to make is that this process
#   will still be sparked by the first non-zero value in the array
#
#   This reduces the problem to finding the sign of the first non-zero
#   element. The sign will only be 0 if every single element of the array
#   starts at 0.

n = int(input())

arr = list(map(int, input().split()))
firstNonzeroElement = 0

for num in arr:
    if num != 0:
        firstNonzeroElement = num
        break

if firstNonzeroElement > 0:
    print('MALLOC!')
elif firstNonzeroElement < 0:
    print('REALLOC!')
else:
    print('CALLOC!')

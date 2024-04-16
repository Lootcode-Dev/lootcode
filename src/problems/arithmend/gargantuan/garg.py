def addStrings(num1, num2):
        l, l2 = len(num1) - 1, len(num2) - 1
        x, carry = 0, 0
        answer = []

        while l >= 0 or l2 >= 0 or carry > 0:
            digit1 = int(num1[l]) if l >= 0 else 0
            digit2 = int(num2[l2]) if l2 >= 0 else 0

            x = digit1 + digit2 + carry

            carry = x // 10
            x %= 10

            answer.insert(0, str(x))

            if l >= 0:
                l -= 1
            if l2 >= 0:
                l2 -= 1

        return ''.join(answer)

nums = input()
num1, num2 = nums.split()
print(addStrings(num1, num2))
def removeDuplicates(s):
    stack = []
    pop_count = 0
    for char in s:
        if not stack or stack[-1] != char:
            stack.append(char)
        else:
            stack.pop()
            pop_count += 1
    
    return ''.join(stack), pop_count

word = input()
result, pop_count = removeDuplicates(word)
print(pop_count)
print(result)

def removeDuplicates(s, k):        
    stck = [['$', 0]]     # a placeholder to mark stack is empty. This eliminates the need to do an empty check later
    pop_count = 0
    
    for c in s:
        if stck[-1][0] == c:
            stck[-1][1] += 1 # update occurences count of top element if it matches current character
            if stck[-1][1] == k:
                stck.pop()
                pop_count += 1
        else:
            stck.append([c, 1])            
    
    return ''.join(c * cnt for c, cnt in stck), pop_count


k = int(input())
word = input()

result, pop_count = removeDuplicates(word, k)
print(pop_count)
print(result)
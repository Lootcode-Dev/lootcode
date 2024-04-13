def triangleNumber(nums):    
        count = 0
        n = len(nums)
        
        # If the array has less than three elements, then array elements cannot give a single triangle sides
        if n < 3:
            return 0
        
        # Sorting the array before using binary search algorithm
        nums.sort()
        
        for i in range(2, n): # Selecting the c value
            
            left, right = 0, i - 1 # Initial a and b values
            
            while left < right:
                
                if nums[left] + nums[right] > nums[i]: 
                    # If current left and right values satify triangle property then all the left values less       
                    # current right will also satisfy the property. So we will get total of (right - left) number
                    # of eligible triangles
                    count += (right - left) 
                    
                    # Now that we have found out all the values with current right values, let's check smaller
                    # right values
                    right -= 1
                else:
                    # Since addition of values at left and right is less than the value at index i, we
                    # will increase the addition of left and right by increasing the value of left
                    left += 1
                    
        return count

n = int(input())
nums = list(map(int, input().split()))
print(triangleNumber(nums))
def checkIfExist(arr):
        arr.sort()
        for i in range(len(arr)):
            product = arr[i]*2
            lo,hi = 0,len(arr)-1
            while lo<=hi:
                mid = (lo+hi)//2
                if arr[mid]==product and mid!= i:
                    return "YES"
                elif arr[mid]<product:
                    lo+=1
                else:
                    hi-=1
        return "NO"

n = int(input())
arr = list(map(int, input().split()))
print(checkIfExist(arr))
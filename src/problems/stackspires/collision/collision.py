n = int(input())
nums = list(map(int, input().split()))

def debrisCollision(debris):
        st = []
        for x in debris:
            surv = True
            if x > 0:
                st.append(x)
            else:
                while len(st) > 0:
                    y = st[-1]
                    if y < 0:
                        break
                    elif x + y == 0:
                        surv = False
                        st.pop()
                        break
                    elif x + y < 0:
                        st.pop()
                    else:
                        surv = False
                        break
                if surv:
                    st.append(x)
        return st

res = debrisCollision(nums)
print(" ".join(map(str, res)), end='')
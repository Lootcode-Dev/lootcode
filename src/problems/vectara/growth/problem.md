# Growth

Growth is incredibly important, and thats exactly why we document it. Whether it be mood, performance, or our stock investments, us Vectarians are always looking to improve.

However, we also realize that the journey is much more important than the destination. We want to know how we got to where we are, and how we can improve in the future, and thats why we want to find the longest period of time where we continued to grow.

**If there are multiple such periods of growth we want to find the first instance of this growth**

## Input

Input consists of a single integer _n (2 ≤ n ≤ 10^6)_, the number of metrics we have. The next line contains _n_ integers, representing the metrics we have.

```
5
1 3 5 4 7
```

## Output

Output a single integer, the length of the longest period of time where we continued to grow (each number greater than the last, not greater than or equal to - we don't like to see stagnation). Then, print the segment of metrics where this growth occurred, separated by spaces. Lastly, print the average growth between each recording in the segment up to two decimal places.

```
Length: 3
Segment: 1 3 5
Average Growth: 2.00
```

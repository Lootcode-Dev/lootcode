# The Tome of Equilibrium

Given an collection of intervals output the sum of all the interval lengths. Overlapping intervals should only be counted once.

Intervals are represented by a pair of integers. The first value of the interval will always be less than the second value. The first value in the interval is inclusive and the second value is exclusive. 

## Input

The first line of input will contain an Integer n (1 ≤ n ≤ 10^5), representing the number of intervals.
The next n lines will contain two space integers representing the first and second value in the interval, these values will not exceed 10^9.

```
3
1 4
7 10
3 5
```

## Output

Output the sum of all the inrevals only counting overlaps once.

```
7
```
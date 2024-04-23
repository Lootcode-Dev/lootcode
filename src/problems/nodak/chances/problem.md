# Chances

Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability.

## Input

The first line of input will contain 4 space seperated integers, __n (2 ≤ n ≤ 10^4)__ representing the number of nodes, __c (0 ≤ c ≤ 2*10^4)__ representing the amount of connections (edges),
 __s, e (0 ≤ s, e ≤ n)__ representing your start and ending point.

The next __c__ lines will contain 2 space seperated integers followed by a floating point number __u__, __v__, __w__ __(0 ≤ u, v < n)__ __(0 ≤ w ≤ 1)__, representing a connection from u to v with a w probability of success.

```
3 3 0 2
0 1 0.5 
1 2 0.5
0 2 0.2
```

## Output

Output the maximum possible probability of you getting from node s to e.

If there is no path from start to end, return 0. Round to the nearest hundred thousandths place (1e-5).

```
0.25000
```


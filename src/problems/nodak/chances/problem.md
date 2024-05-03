# Chances

Traversing our beautiful homeland of Nodak is terribly tough... I'm surprised you haven't gotten lost yet! Each of our settlements are deeply intertwined with others, with many roads connecting many places together. It really is easy to get lost!

Okay, I don't know why I'm acting so confident in my traversal. To be honest, some of us Nodes have lost our sense of direction too lately. It's become increasingly difficult to get around. Sorry for boasting.

Given two regions, start and end, find the path with the maximum probability of success to go from start to end and return its success probability. This way you can help me get back home! Seriously, I've been stuck out here for days now!

## Input

The first line of input will contain 4 space separated integers, __n (2 ≤ n ≤ 10^4)__ representing the number of nodes, __c (0 ≤ c ≤ 2*10^4)__ representing the amount of connections (edges),
 __s, e (0 ≤ s, e ≤ n)__ representing your start and ending point.

The next __c__ lines will contain 2 space separated integers followed by a floating point number __u__, __v__, __w__ __(0 ≤ u, v < n)__ __(0 ≤ w ≤ 1)__, representing a bidirectional connection from u to v with a w probability of success.

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


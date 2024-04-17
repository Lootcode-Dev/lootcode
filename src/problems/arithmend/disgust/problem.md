# Disgust

As there is beauty in arithmetic, what is beauty without disgust? We must find these relationships among the digits in order to establish a balance. And to do so, we must find disgusting numbers.

A distgusting number is a positive integer whose prime factors are limited to 2, 3, and 5, for a number with those prime factors are truly quite boring. And with boredom, comes disgust. Here are a few examples of determining if a number is disgusting:

- 6 = 2 \* 3 (disgusting)
- 1 = 1 (disgusting - no prime factors)
- 14 = 2 \* 7 (not disgusting, since 7 is a prime factor, thus, 14 is not limited to 2, 3, and 5)

Oh how repulsive! Please help us find more of these disgusting numbers!

## Input

The input will contain a single integer, _n (1 ≤ n ≤ 10^6)_, which represents the number of disgusting numbers to find. The following _n_ lines will contain a single integer, _x (1 ≤ x ≤ 10^6)_, which represents the number to check for disgust.

```
3
6
1
14
```

## Output

Print _d_, or the number of disgusting numbers. Then, print _d_ lines, each with a disgusting number in the order they were given.

```
2
6
1
```

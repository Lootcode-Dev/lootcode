# Partitions

A partition of an integer n is a set of positive integers which sum to n, typically written in descending
order. For example:

```
10 = 4+3+2+1
```

A partition is m-ary if each term in the partition is a power of m. For example, the 3-ary partitions of 9
are:

```
9
3+3+3
3+3+1+1+1
3+1+1+1+1+1+1
1+1+1+1+1+1+1+1+1
```

Write a program to find the number of m-ary partitions of an integer n.

## Input

The line contains the base of powers, m, (3 ≤ m ≤ 100), followed by a space, followed by the integer,
n, (3 ≤ n ≤ 10000), for which the number of m-ary partitions is to be found.

```
3 9
```

## Output

For each data set there is one line of output. The output line contains the number of m-ary partitions of n.

```
5
```
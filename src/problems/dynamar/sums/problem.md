# Sums

The challenge committee has thrown us another competition. Sure, there are challenged like this one in Dynamar every year to keep us sharp, but this one seems to leave me... perplexed. There are a series of rooms in the Labyrinth of Sums. The Labyrinth contains a series of rooms, each marked by a number *n*. The task for each of us is to reduce that number to a partition of numbers that add up to *n*. The correct partitions will lead us to valid clues down the line, so we really need a hand.

A partition of an integer n is a set of positive integers which sum to n, typically written in descending
order. For example:

```
10 = 4+3+2+1
```

However, that would be too easy, we must also only consider partitions where each number is m-ary. A partition is m-ary if each term in the partition is a power of m. For example, within one of the rooms marked with the number 9 and given the base 3, the aspirant might find partitions such as:

```
9
3+3+3
3+3+1+1+1
3+1+1+1+1+1+1
1+1+1+1+1+1+1+1+1
```

The Challenge committee really threw it at us this year... Do you think you can help? 

## Input

The line contains the base of powers, m, (3 ≤ m ≤ 100), followed by a space, followed by the integer,
n, (3 ≤ n ≤ 10000), for which the number of m-ary partitions is to be found.

```
3 9
```

## Output

Output the number of valid m-ary partitions, representing valid paths.

```
5
```
# The Dichomoton

Vladislav has n non-negative integers, and he wants to divide all of them into several groups so that in any group, any pair of numbers does not have matching bit values among bits from 1-st to 31-st bit (i.e., considering the 31 least significant bits of the binary representation).

Formally, for any two numbers x and y in the same group, the condition x2(i) ≠ y2(i) must hold for all 1 ≤ i < 32.

What is the minimum number of groups Vlad needs to achieve his goal? Each number must fall into exactly one group.

## Input

The first line contains a single integer n (1 ≤ n ≤ 2 * 10^5) — the total number of integers.

The second line contains n given integers a1,…,an (0 ≤ aj < 2^31).

```
4
1 4 3 4
```

## Output

Output a single integer — the minimum number of groups required to satisfy the condition.

```
4
```

# Stone Circles

There are some intriguing magical monuments in Findara, said to grant immense power, or grand misfortune. One of which is the Stone Circle, a ring of stones that are said to be able to grant the wishes of those who quickly solve its puzzle.

The puzzle is quite simple. There are stones that surround the pillar, each with a number on them. The goal is to find a target stone around the pillar. The stones are sorted in ascending order, but you are unsure where the numbers start. It's as if the stones were rotated around the pillar a random number of times.

The complexity of the puzzle comes not from the task itself, but the immense number of stones that surround the pillar. You need to solve this puzzle quickly, or you may never get the chance to make your wish.

## Input

The input will consist of _n (1 ≤ n ≤ 10^6)_, and _m (1 ≤ m ≤ 10^6)_, representing the number of stones around the pillar and target stone respectively. Then, the next line will consist of _n_ non-distinct, space separated integers, where each integer is a number on a stone.

```
7 0
2 5 6 0 0 1 2
```

## Output

The output will consist of "MAKE A WISH" if the target stone is found, or "YOU SHALL NOT PASS" if the target stone is not found.

```
MAKE A WISH
```
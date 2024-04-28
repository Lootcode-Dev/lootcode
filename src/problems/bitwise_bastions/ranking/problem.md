# Ranking

Rank is an important concept in the world of militant strategy. It is used to determine the order in which soldiers should be deployed in a battle, or perhaps who will be the one to lead the charge.

The ranking system is quite simple. Each soldier is represented by their valor, which is - what you call - a binary number. The rank for a soldier is determined by the number of 1's in their valor. The more 1's a soldier has, the higher their rank. If two soldiers have the same number of 1's in their valor, then sort by the significance of the 1's in their valor. The more significant the 1's, the higher the rank.

Given a list of soldiers, you must sort them by their rank in ascending order. To make this _human friendly,_ the provided numbers will instead be represented in decimal form.

## Input

The first line of input will be an integer, _n (0 ≤ n ≤ 100000)_, representing the number of soldiers in the list. The next line will consist of _n_ space separated integers, each representing a soldier's valor.

```
9
0 1 2 3 4 5 6 7 8
```

## Output

Print the sorted list of soldiers in ascending order of rank.

```
0 1 2 4 8 3 5 6 7
```

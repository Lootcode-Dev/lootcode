# Adjacency

Oftentimes, we find ourselves facing the problem of relationships. I don't mean romantic ones, in this case I mean the relationship of adjacency. We find it important to know who our neighbors are, or for lack of a better term, our adjacent homeowners.

Given two segments of land, determine if two people *P* and *C* share a yard. Each person can move a square directly up, down, right, or left, moving as many times as they'd like. Each person must remain within the analyzed grid. 

Sharing a yard means the two people, with appropriate moves, may meet. Help us figure out who our neighbors are, I'd like to drop of some cookies!

## Input
Input will begin with two integers, R and C (1 ≤ R, C ≤ 10) separated by a space. Each of the next R lines will
contain C characters of either *_*, *#*, *P* or *C*. This will form a grid that represents the yard. 

An *_* represents a cell free of obstructions, *#* represents a wall,
*P* is person 1's location and *C* is person 2’s location. Each grid is guaranteed to have one and only one P and C.

```
8 7
__P____
####_##
_____#_
_____#C
##_###_
_____#_
___#_#_
___#___
```

## Output

Output a single line containing “yes” if the two people share a yard and “no” if they are not in the same section of the grid.

```
yes
```
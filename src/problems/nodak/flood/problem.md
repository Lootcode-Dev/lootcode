# Flood

Jill, the new lab assistant has made new cages for the lab rabbits, Peter and Cottontail.
Unfortunately, these new cages are more like mazes with walls in every direction. Help
Arup determine if the rabbits are in the same section of the cage or different sections.
Each rabbit can hop one square directly up, down, right or left. They can hop as many
times as they want from one free square to another. Each rabbit must stay on the grid.

## Input
Input will begin with two integers, R and C (1 ≤ R, C ≤ 10) separated by a space. Each of the next R lines will
contain C characters of either ‘_’,’#’, ‘P’ or ‘C’ (Quotes for clarity). This will form a grid
that represents the cage. 

A ‘_’ represents a cell free of obstructions, ‘#’ represents a wall,
‘P’ is Peter’s location and ‘C’ is Cottontail’s location. Each grid is guaranteed to have
one and only one P and C.

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

Output a single line containing “yes” if Peter and Cottontail are in the
same section of the cage and “no” if they are not in the same section of the cage.

```
yes
```
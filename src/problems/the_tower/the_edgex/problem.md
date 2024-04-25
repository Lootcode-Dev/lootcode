# The Edgex

You are given a grid, which always includes exactly two end-points indicated by X.

In this grid empty spaces are seen as tilde (~).

A line can have the following characters :
- __\-__ = left / right
- __|__ = up / down
- __+__ = corner

## Valid Lines
- The most basic kind of valid line is when the end-points are already adjacent.
- The corner character (+) must be used for __all__ corners (but __only__ for corners).
- If you find yourself at a corner then you __must__ turn.
- It must be possible to follow the line with __no ambiguity__ (so if it's possible to go two different directions at any given moment then the line is invalid), and __never treading on the same spot twice__.
- The line may take any path between the two points.
- Sometimes a line may be valid in one direction but not the other. Such a line is still considered valid.
- Every line "character" found in the grid must be part of the line. If extras are found then the line is not valid.


## Input 

The first line of input will consist of 2 space seperated integers r and c (1 ≤ r, c ≤ 1000) representing the amount of rows and columns in the grid.

The next r lines contain c characters representing a row in the grid.

```
6 20
~~~~~~~~~~~~~~~~~~~~
~~~~~+--------+~~~~~
~~X--+~~~~~~~~+--+~~
~~~~~~~~~~~~~~~~~|~~
~~~~~~~~~~~~~~~~~X~~
~~~~~~~~~~~~~~~~~~~~
```

## Output

You simply need to output true/false if you can detect a __one and only one__ "valid" line joining those points.

```
true
```

#### Hint

Imagine yourself walking a path where you can only see your very next step. Can you know which step you must take, or not?
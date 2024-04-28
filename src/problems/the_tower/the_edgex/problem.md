# The Edgex

"I'M SURPRISED YOU COULD EVEN FIND YOUR WAY UP THE STAIRS, GOOD LUCK FINDING YOUR WAY TO THE EDGEX!"

The Edgex alone powers the interwoven complexity of Nodak. That was until it was stolen, and brought here. The Edgex is a powerful relic that the Nodes have suffered without for too long.

In order to steal the Edgex back, you need to beat it at its own game. The Edgex is responsible for navigating graph-like relationships, like that of a grid, web, or maze. Now, the Edgex has been stored within the Tower on a constantly moving platform being powered by the Edgex against its will, instructed to make it impossible to reach. In order to retrieve it, you need to outsmart it. It won't be easy, as the Edgex has positioned itself in such a way that requires a very specific path to be taken in order to reach it.

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

Since these configurations are constantly changing, you need to know when to strike. Stand still, bide your time, and when there is a valid path, sprint like hell. The Edgex is yours, you just have to stop and think.


## Input 

The first line of input will consist of 2 space seperated integers r and c (1 ≤ r, c ≤ 1000) representing the amount of rows and columns in the grid, representing the Edgex chamber..

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

You simply need to output "NOW!" if you can detect a __one and only one__ "valid" line joining these points, which gurantees your ability to retrieve the missing Edgex. If there is no valid line, output "HOLD!".

```
NOW!
```

#### Hint

Imagine yourself walking a path where you can only see your very next step. Can you know which step you must take, or not?
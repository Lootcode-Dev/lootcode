# The Lens of Clarity

Count the the black squares on a special checkerboard. It is special because it has a resolution which determines how the black and white squares are laid out.

The resolution refers to the dimensions of squares of a single color. See below for an example with dimensions 11x6:

With resolution = 1:

![](http://localhost:3000/ClarityLens1.png)

__Number of black squares = 33__

And now with resolution = 2:

![](http://localhost:3000/ClarityLens2.png)

__Number of black squares = 32__

And one more example, resolution = 5:

![](http://localhost:3000/ClarityLens3.png)

__Number of black squares = 31__

The top left square is always white, and we are counting the individual black squares on the board.

## Input

Input consists of three space seperated integers, w, h, r (0 ≤ w, h, r ≤ 2^32) representing the width of the grid, the height of the grid, and resolution of the squares.

```
11 6 2
```

## Output 

Output the number of black squares on this special checkerboard.

```
32
```

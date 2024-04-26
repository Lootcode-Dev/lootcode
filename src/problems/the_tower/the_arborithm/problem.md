# The Arborithm

A template for an artwork is a white grid of n × m squares. The artwork will be created by
painting q horizontal and vertical black strokes. A stroke starts from square (x1, y1), ends at
square (x2, y2) (x1 = x2 or y1 = y2) and changes the color of all squares (x, y) to black where x1 ≤ x ≤ x2 and y1 ≤ y ≤ y2.

The beauty of an artwork is the number of regions in the grid. Each region consists of one or
more white squares that are connected to each other using a path of white squares in the grid,
walking horizontally or vertically but not diagonally. The initial beauty of the artwork is 1. Your
task is to calculate the beauty after each new stroke. 

Here is an example of the sample input

![](http://localhost:3000/Arborithm.png)

## Input

The first line of input contains three integers n, m and q (1 ≤ n, m ≤ 1000, 1 ≤ q ≤ 10^4).

Then follow q lines that describe the strokes. Each line consists of four integers x1, y1, x2
and y2 (1 ≤ x1 ≤ x2 ≤ n, 1 ≤ y1 ≤ y2 ≤ m). Either x1 = x2 or y1 = y2 (or both).

```
4 6 5
2 2 2 6
1 3 4 3
2 5 3 5
4 6 4 6
1 6 4 6
```

## Output

For each of the q strokes, output a line containing the beauty of the artwork after the stroke.

```
1
3
3
4
3
```
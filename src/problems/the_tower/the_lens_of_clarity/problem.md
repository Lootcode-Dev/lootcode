# The Lens of Clarity

"GLANCE INTO THE LENS ALL YOU WANT, YOU WILL NEVER FIND THE SATISFACTION YOU ARE LOOKING FOR!"

The Lens of Clarity is the core of Findara, and solely responsible for the Search Boundary. Peering into the Lens of Clarity allows Findars to find anything, anytime, anywhere. That was until it was stolen from them.

The Lens of Clarity has lost its ability to see into Findara, and now, peering into it reveals a puzzle that you must solve in order to re-calibrate it to Findara before taking it back from this god forsaken island. Should you grab it and run, you risk destroying it. And thus, risk dooming Findara for all eternity.

Peering into the Lens, you see a malfunctioned view of Findara, with a perfectly composed grid board of the region. Squares of a certain size show Findaran land, while the rest of the view is completely white. This view is best represented by a checkerboard, where black tiles are visible portions of Findara, and the white segments are inaccessible.

Count the the black squares on this special checkerboard. Furthermore, it is special because it has a resolution which determines how the black and white squares are laid out. This resolution directly correlates to the scale in which the view of Findara is formed.

The resolution refers to the dimensions of squares of a single color. See below for an example view with dimensions 11x6:

With resolution = 1:

![](https://www.lootcode.dev/problems/claritylens1.png)

__Number of black squares = 33__

And now with resolution = 2:

![](https://www.lootcode.dev/problems/claritylens2.png)

__Number of black squares = 32__

And one more example, resolution = 5:

![](https://www.lootcode.dev/problems/claritylens3.png)

__Number of black squares = 31__

The top left square is always white, and we are counting the individual black squares on the board, each representing a square mile of the visible Findaran realm. By finding the area covered by the Lens of Clarity, you will be able to re-calibrate the Search Boundary to the right size to steal back the Lens.

## Input

Input consists of three space separated integers, w, h, r (0 ≤ w, h, r ≤ 2^32) representing the width of the grid, the height of the grid, and resolution of the squares.

```
11 6 2
```

## Output 

Output the number of black squares on this special checkerboard, or the number of square miles viewed by the Lens of Clarity.

```
32
```

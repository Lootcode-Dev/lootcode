# Flooring

Looking at our kitchen floor, we knew we must've done something wrong.

We were trying to reallocate our kitchen floor and were almost done, but we couldn't seem to find a tile that would fit in the final spot.
We have some more tiles and we know **two** of them could combine to make the tile we want.
However, we're having trouble finding which ones.

Normally the kitchen would reallocate itself, but not ever since...

## Input

The first line of input will be 2 integers, _n (1 ≤ n ≤ 100)_ and _t (1 ≤ t ≤ 1000)_, where n represents 
the number of tiles we have and t represents the target length for the tile we want.

The next line contains _n_ space seperated integers representing the length of the tiles we have.

**There will always only be a single valid solution.**

```
5 9
2 7 11 15 20
```

## Output

Print the position of the two tiles we need to combine to fill in our kitchen floor. The position should be printed in increasing order (e.g., the tile with the lower position should be printed first).

```
0 1
```

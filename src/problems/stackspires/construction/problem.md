# Construction

Ever since we've gotten all these damn tremors, our glorious spires have since shifted, and become imperfect. This brings a terrible shame to our homelands, given the fact that we're named after them. Anyways, pride aside, we need some help identifying all of the spires that have been shifted erroneously, and validate all of those that have remained safe.

Each level of a building has a beginning and end identifier. In order for a building to be valid, a beginning tag must be closed by an ending tag, in order. This is kind of like how parentheses work, but really, its a lot different if you dont think about it too much!

For example, a valid building with pairings A : B, C : D, and E : F, would be ACEFDB, the same way ([{}]) is a valid parenthesis configuration. See, not that hard.

## Input

The first line of input will be an integer, _n (1 ≤ n ≤ 10)_, representing the number of beginning/end pairs to read in. The next _n_, lines will be two characters, separated by spaces, with the beginning character being first and the ending character being second. Then, on the line after that, will be a building configuration with length _m (1 ≤ m ≤ 20)_

```
3
A B
C D
E F
ACEFDB
```

## Output

Print "All Steady!!!" if the building is a valid configuration. If not, print, "LOOK OUT BELOW!!!".

```
All Steady!!!
```


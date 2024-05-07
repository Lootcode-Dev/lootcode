# Construction II

Hey, its us again. If you haven't already helped us with our last project, I suggest you check it out.

Our last methods weren't very effective to say the least. Rather than narrowing down the parts of a spire that are weak or strong, we really just wanted to know if the whole damn thing was good or not. Unfortunately, the budget is tight, and its not like we can replace the whole spire. We can only really salvage one contiguous piece of a spire during reconstruction, and we'd like some help figuring out which _valid_, segment of the spire is the largest.

Just to refresh, each level of a building has a beginning and end identifier. In order for a building to be valid, a beginning tag must be closed by an ending tag, in order. This is kind of like how parentheses work, but really, its a lot different if you dont think about it too much!

For example, a valid building with pairings A : B, C : D, and E : F, would be ACEFDB, the same way ([{}]) is a valid parenthesis configuration. See, not that hard.

## Input

The first line of input will be an integer, _n (1 ≤ n ≤ 10)_, representing the number of beginning/end pairs to read in. The next _n_, lines will be two characters, separated by spaces, with the beginning character being first and the ending character being second. Then, on the line after that, will be a building configuration with length _m (0 ≤ m ≤ 20)_.

```
3
A B
C D
E F
ACEFDBACDDEFCD
```

## Output

Print the length of the longest valid spire segment.

```
6
```


# Combinations

We're reorganizing some of our residential districts in preparation for a city reallocation, and we could use some help. We've got some pretty solid ideas about household configurations, but we aren't quite sure yet. Now, for some larger districts, its been really hard to come up with the various ways to organize them. Thankfully, all districts in Vectara are long contiguous lines of houses, so there aren't many things to consider.

All we really need help with is coming up with all of the possible variations of a city block, pretty much just all possible permutations of configurations that could be made from a few houses. Its pretty easy with one or two homes, but we're talking a bit more than that...

## Input

Input will consist of an integer _n (1 ≤ n ≤ 9)_, representing the number of homes to be put into combinations. The next line will represent an array of _n_ numbers, separated by spaces, which represent the identifier of a given home.

```
3
1 2 3
```

## Output

Print each possible configuration on its own line, sorted lexicographically by its string representation 

```
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
```

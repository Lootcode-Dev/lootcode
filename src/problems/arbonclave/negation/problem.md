# Negation

In the never-ending smog of the green and purple. A deep miasma flutters about the forest expanse of the Arborenclave. Roots, filled to the brim with life and fresh, youthful stories have decayed with the sands of time. In their place are items, locations, and artifacts that used to mean something. However, for you, it's just space to be cleaned.

With the dawn of the recent age... This smog, known as the 'wither' has been encroaching on the Arborenclave, rending areas filled with life into rusted black, leaving chaos in its wake.

As the people panic in search of new homes, people like you have taken up your mantle in the pursuit of purposing these rusted roots into new homes for the Arbors.

Recently, you've been assigned with the task of cleaning out an old root system. The withered items in the interior must be negated and the structure of the root system must be changed.

## Input

The first line of input will be an integer __N (1 ≤ N ≤ 1000)__.

The next N lines of input will contain 3 Integers representing a Node and its two children.

NULL nodes will be represented with a 0

__The input will always consist of a valid Binary Search Tree__

```
3
-10 -50 5
5 0 0
-50 0 0 
```

## Output

Output all the connections in the same order as they were given to you after the negation to the tree. The tree must remain as a binary search tree even after the negations.

```
10 -5 50
-5 0 0
50 0 0
```



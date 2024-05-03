# Traversal II

It's us again... and we need your help once more. The way the structures of the Arbonclave are organized, we would like to fortify the structures closest to the root of the Arbonclave. If you haven't yet, go ahead and review Traversal I for details about how we organize our treehouses.

Anyways, in order to know which houses are the most important, they must be visualized in a way that we can see their ordering. The most important, is of course, the root of the Arbonclave. Then, for each layer of structures, the importance goes from left to right. Now, we need you to implement a way to tell us this ordering of the structures.

## Input

Input will consist of a single integer, _n (1 ≤ n ≤ 100,000)_, which represents the number of houses in the Arbonclave. The next line will contain _n_ distinct, space-separated integers, which represent the addresses of the houses in the Arbonclave. These addresses are ordered by insertion, with the first number being the first inserted into the BST configuration (root).

```
5
3 1 4 2 5
```

## Output

Output will consist of a single line, each of the structures in the Arbonclave for the breadth-first traversal, printing each tier of the Arbonclave from top to bottom, left to right.

```
3 1 4 2 5
```

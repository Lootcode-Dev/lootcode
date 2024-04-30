# Traversal I

Hello fair traveller... We here at the Arbonclave are experts at organization, and thus, we have come up with a form of organizing our treehouses. From each house, you can move to two other houses. The house to the left has a smaller address, and the house to the right has a larger address. This format helps us organize ourselves in a way that is easy to navigate.

For various reasons, we need to represent the layout of our houses in different orders. We have a few different ways to do this, and we need your help to implement them.

The three different representations are in-order, pre-order, and post-order.

- In-order: In this representation, we first visit the left child, then the current node, and finally the right child.
- Pre-order: In this representation, we first visit the current node, then the left child, and finally the right child.
- Post-order: In this representation, we first visit the left child, then the right child, and finally the current node.

For each of these representations, we need you to implement a way to tell us the order of the houses for each of the three representations.

## Input

Input will consist of a single integer, _n (1 ≤ n ≤ 100,000)_, which represents the number of houses in the Arbonclave. The next line will contain _n_ distinct, space-separated integers, which represent the addresses of the houses in the Arbonclave. These addresses are ordered by insertion, with the first number being the first inserted into the BST configuration (root).

```
5
3 1 4 2 5
```

## Output

Output will consist of three lines, each containing the order of the houses in the Arbonclave for the in-order, pre-order, and post-order representations, respectively, after assembling the values as a binary search tree.

```
1 2 3 4 5
3 1 2 4 5
2 1 5 4 3
```

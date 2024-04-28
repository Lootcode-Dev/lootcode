# The Root

"WHEN WILL YOU LEARN? NO MATTER HOW FAST OR STRONG, YOU CANNOT OUTSMART MY FOREST!"

The Ursol Tree stands tall in the center of the Arbonclave, and is said to be the birthplace of all Treefolk of the region. That was until the Ursol Tree was robbed of its power. The Arbonclave now faces critical withering threatening the homes of the Treefolk, and without the Root of the Ursol Tree, the withering will soon spread to the people.

Kept on a floor of the tower, the Ursol Root is now surrounded by magical trees that are blocking the way to the Root, and have sworn to protect it by any means necessary - even violence. Unaware of what the situation is, or that keeping the Root here will do more harm than good, these trees are dedicated. In order to retrieve the Root, you must burn down the trees in your way and retrieve it. Don't worry, the magical trees do not feel pain, and you _think_ the Root is fireproof.

The room guarding the Root is triangular in shape, and the trees in your way could best be represented as a binary search tree. Given integers representing IDs of the trees, you must first assemble them into a binary search tree. Then, given a target node, you must print the order of events from lighting the target tree ablaze. Fire spreads to adjacent trees, or in this case, the children and parent. Each tree that is on fire spreads to the adjacent trees every event.

Burn that room to high hell, and get back the Ursol Root. The Arbonclave is counting on you.

## Input

Input will consist of two lines. The first line will contain two integers _n_ and _m_, _n (1 ≤ n, m ≤ 10^6)_, the number of trees in the room and the target node respectively. The second line will contain $n$ space separated integers, the IDs of the trees in the room.

```
6 3
3 1 4 2 5 6
```

## Output

Output the order of the burnings, with each line being sorted by ID.

```
3
1 4
2 5
6
```

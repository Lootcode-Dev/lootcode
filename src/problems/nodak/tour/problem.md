# Tour

We love adventures. Every season, we and our friends explore sprawling mazes scattered across a remote sector. We enter at any entry point in the maze, from where we navigate through a series of interconnected passages and chambers.

Of course, we aim to traverse only the most exhilarating paths, under the most favorable conditions. To optimize our experience, we use a combined condition measure and rate all the available routes daily. Can you help us find the most thrilling route through the maze?

## Input

The input consists of:

one line with two integers n (2 ≤ n ≤ 1000) and m (1 ≤ m ≤ 5000), where n is the number of (1-indexed) connecting chambers in the maze and m is the number of passageways.

m lines follow, each with three integers s, t, c (1 ≤ s, t ≤ n, 1 ≤ c ≤ 100) representing a slope from point s to point t with condition measure c.

Chambers without incoming passageways are entry points with enticing mysteries, and chambers without outgoing passageways are exits leading out of the maze. The helicopter can drop the adventurers off at any chamber, so they can start and end their exploration at any point they desire. All passageways flow in one direction, ensuring that once they leave a chamber, they cannot return to it through any passageway.

```
5 5
1 2 15
2 3 12
1 4 17
4 2 11
5 4 9
```

## Output

Output a single number n that is the maximum sum of condition measures along a path that the
friends could take.

```
40
```
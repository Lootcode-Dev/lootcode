# The Pebble

"EVEN WITH AN UNDERWHELMING NAME LIKE THE PEBBLE, IT WILL STILL AMOUNT TO MORE THAN YOU EVER WILL!"

Don't let the name underwhelm you, the Pebble is arguably one of the most powerful relics in all of Algorion. The magic of the Stackspires dictates that items, by placing things atop one another, become stronger the more things that are on top of it. That is what makes the Stackspires so sturdy, or at least, until the Pebble was stolen. It is said that the trade-off of this magical property, is that removing the first in out first has catastrophic effects.

The removal of the Pebble is exactly what has caused the landslides in the Stackspires, since this property was fundamentally violated. And thus, there is now rubble scattered all throughout the Stackspires. The only way to put the Pebble back where it belongs is to be able to identify the rubble that needs to go on top of it. It would be immature to take the Pebble back to the Stackspires without knowing how to put it back once you get there.

We have a bunch of rubble to analyze. If you remember from Construction I and Construction II, valid Stackspires follow a valid parenthesis structure, and thus, can be represented as a character from ()[]{}. These pieces of rubble are also connected to each other with edges, which represent the spire configuration before it fell.

A path is a sequence of one or more nodes where no node is repeated and every pair of adjacent nodes is connected with an edge. A path is balanced if the characters at each node, when concatenated, form a balanced string. A string is balanced if it satisfies the following definition:

- An empty string is balanced.

- If is a balanced string, then (s), [s], and {s} are balanced strings.

- if a and b are balanced strings, then ab (a concatenated with b) is a balanced string.

As an example, the following input would be visually represented as such. 

```
4
()()
1 2
2 3
3 4
```

![](https://www.lootcode.dev/problems/pebble.png)

Notice valid paths can be traversed across any number of adjacent edges in the case of path 4. A valid path is simply a connection between an opening parenthesis and a closed parenthesis of the same type.

Compute the number of balanced paths over the entire tree, which is crucial in determining the configuration to restore the Stackspires.
## Input

The first line of input contains a single integer n (2 ≤ n ≤ 5*10^3).

The next line contains a string of n characters, where each character is one of ()[]{}.

Each of the next n-1 lines contains two integers, u and v (1 ≤ u, v ≤ n), indicating that nodes u and v are connected with an edge. It is guaranteed the graph is a tree.

```
4
()()
1 2
2 3
3 4
```

## Output

Output a single integer, which is the number of balanced paths over the entire tree.

```
4
```
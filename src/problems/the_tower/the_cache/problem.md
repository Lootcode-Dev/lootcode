# The Cache

"UNLIKE YOU, THE DYMADS HAD TO BE CLEVER TO DECIPHER THE CACHE... GOOD LUCK FINDING YOUR WAY OUT OF THE TOWER!"

A beautifully woven tapestry, hundreds of square feet large, and miles and miles of yarn, the Cache is more than just an art project to the Dymads. Representing complexity through yarn, this weaving holds the key to all past, present, and future decisions. While many patterns are present on the cache, one of the most prominent are triangles. These triangles represent a decision, with each layer being branches of the decisions that come before it. By looking and analyzing the triangles on the Cache, it is said that you can solve just about any problem in Algorion.

By "sliding down" the top of a triangle through the path of the maximum sum, you are able to determine the best decision to make at each turn. You've wandered this maze floor of the tower for hours, and now, you find the Cache before you. You are dazed, tired, and unsure if you will be able to make it out yourself. Maybe if you can reference the cache's triangles yourself... maybe, just maybe, you can make it out alive.

```
   /3/
  \7\ 4
 2 \4\ 6
8 5 \9\ 3
```

Let's say that the 'slide down' is the maximum sum of consecutive numbers from the top to the bottom of the pyramid. As you can see, the longest 'slide down' is 3 + 7 + 4 + 9 = 23. This maximum sum represents the series of decisions to make to solve the problem at hand, with left and right slides representing a variety of things. Staring into the Cache, you are simply able to tell what it means.

Given a triangle find its largest "slide down"

Without the Cache, the Dymads have lost their critical reference to problem solving, and have begun losing themselves in their very own labyrinthine home, resulting in people going missing and even starving to death in the depths of the maze. Restoring the Cache to Dynamar is critical. Use the Cache save yourself, and then return it to Dynamar.

## Input

The first line of input will consist of an Integer n (1 ≤ n ≤ 10^4), representing the number of rows in the pyramid.
The next n lines will consist of the top to bottom rows of the triangle, the ith of these lines will have i numbers.

```
4
3
7 4
2 4 6
8 5 9 3
```

## Output

Output the largest 'slide down' value for the pyramid

```
23
```

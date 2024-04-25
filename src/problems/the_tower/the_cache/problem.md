# The Cache

Pyramids are amazing! Both in architectural and mathematical sense. If you have a computer, you can mess with pyramids even if you are not in Egypt at the time. For example, let's consider the following problem. Imagine that you have a pyramid built of numbers, like this one here:

```
   /3/
  \7\ 4 
 2 \4\ 6 
8 5 \9\ 3
```

Let's say that the 'slide down' is the maximum sum of consecutive numbers from the top to the bottom of the pyramid. As you can see, the longest 'slide down' is 3 + 7 + 4 + 9 = 23

Given a pyramid let us know its largest 'slide down'

## Input

The first line of input will consist of an Integer n (1 ≤ n ≤ 10^4), representing the number of rows in the pyramid.
The next n lines will consist of the top to bottom rows of the pyramid, the ith of these lines will have i numbers.

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
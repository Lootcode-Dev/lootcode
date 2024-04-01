# Collision

Our glorious spires have been collapsing as of late, and its been causing an incredible danger for our citizens. Oddly enough, the collapses have been in pairs, with two adjacent spires collapsing simultaneously. While not frequent, we still need to come up with a foolproof way to mitigate harm to our citizens by accurately predicting the path of falling layered debris.

After the spires collapse, the debris begins to slide down the slope of the spire, causing it to gain speed before hitting the ground. Once it does, the debris from the two spires will slide towards each other, colliding on impact. We want to know the state of the falling debris after these collisions to best defend collateral damage.

We are analyzing a collection of debris that has fallen, represented by an array, symbolizing debris that is sliding towards each other.

For each piece of debris in the array, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each piece of debris moves at the same speed.

For example, in the case of 5 10 -5, the 10 and -5 will collide, causing the -5 to explode, since the 10 is larger. The 5 and 10 will continue to slide right, resulting in 5 10.

Find out the state of the debris after all collisions. If two chunks meet, the smaller one will explode. If both are the same size, both will explode. Two pieces of debris moving in the same direction will never meet.

## Input

Input will consist of an integer, _n (1 ≤ n ≤ 100,000)_, representing the number of pieces of debris in the array. The next line will contain _n_ integers, separated by spaces, representing the size and direction of each piece of debris.

```
3
5 10 -5
```

## Output

Output the state of the debris after all collisions, with each piece of debris separated by spaces.

```
5 10
```

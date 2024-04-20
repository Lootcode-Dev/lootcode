# Jacked

Our local gym has b bars and p plates for barbells. In order to prepare for the upcoming Dynamar Dumbells and  Deadlifts competition, we need to begin considering all of the different weights we can offer to our competitors in the gym. 

We must choose a single bar, which has two sides. We then load each side with a (possibly empty)
set of plates. For safety reasons, the plates on each side must balance; they must sum to the
same weight. The combination of plates on either side might be different, but the total weight
on either side must be the same. What weights are available for lifting?

## Input

The first line of input contains two integers, __b and p (1≤b,p≤14)__, representing the number of bars and plates. 
Then, there are b lines each containing a single integer __x (1≤x≤10^8)__ which are the weights of the bars. After that, there are p lines each
containing a single integer __y (1≤y≤ 10^8)__ which are the weights of the plates.

```
2 5
100
110
5
5
1
4
6
```

## Output
Output a sorted list of all possible lifting weights, one per line. There must be no duplicates.

```
100
110
112
120
122
130
```
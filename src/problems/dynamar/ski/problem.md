# Ski

John loves winter. Every skiing season he goes heli-skiing with his friends. To do so, they rent
a helicopter that ﬂies them directly to any mountain in the Alps. From there they follow the
picturesque slopes through the untouched snow.
Of course they want to ski on only the best snow, in the best weather they can get. For this they
use a combined condition measure and for any given day, they rate all the available slopes.
Can you help them ﬁnd the most awesome route?


## Input

The input consists of:

one line with two integers n (2 ≤ n ≤ 1000) and m (1 ≤ m ≤ 5000), where n is the number of (1-indexed) connecting points between slopes and m is the number of slopes.

m lines, each with three integers s, t, c (1 ≤ s, t ≤ n, 1 ≤ c ≤ 100) representing a slope from point s to point t with condition measure c.

Points without incoming slopes are mountain tops with beautiful scenery, points without outgoing
slopes are valleys. The helicopter can land on every connecting point, so the friends can start
and end their tour at any point they want. All slopes go downhill, so regardless of where they
start, they cannot reach the same point again after taking any of the slopes.

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
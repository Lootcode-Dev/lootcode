# The Index Orb

"TO HELL WITH CUTTING THE BLUE WIRE, TRY DISARMING THE ORB OF VECTARA'S IMMINENT IMPLOSION!"

Floating before you is the relic known as the Index Orb, solely responsible for the self-expanding properties of Vectara. It's absence has caused turmoil throughout the realm, and now, you have the opportunity to restore it to its rightful place.

The Orb, being aware of the fact that it has been stolen and taken to this tower, has begun to collapse onto itself. If it is allowed to do so for too long, it will implode, and take this entire island with it. The implosion process is simple, and if you are able to determine the outcome of the implosion, you will be able to prevent it from happening.

The Orb's effects can be represented as a series of numbers to quantify its implosion. Let us call this original series, _a_. Every second, an implosion occurs, creating a new series of integers, _b_, where the *i*th element of b is equal to the sum of the first _i_ elements in _a_. Then, _a_ is overriden with _b_. For example:

- 0th implosion : 1, -2, 3, -4
- 1st implosion: 1, -1, 2, -2

The implosion process will continue for all of time, unless you are able to intervene. To do so, you must yell a rune at the Orb, depending on one of three outcomes. First, if the last element of _infinity_-th implosions is negative, you must shout "REALLOC!". If the last element is positive, you must shout "MALLOC!". If the last element is zero, you must shout "CALLOC!".

You must determine the outcome of the implosion process, and shout the correct rune to prevent the implosion. Time is of the essence.

## Input

The first line of input will contain a single integer, _n_ (1 ≤ _n_ ≤ 10^5), the number of elements in the 0th implosion of the Orb.

The second line of input will contain _n_ space separated integers, representing the 0th implosion of the Orb.

```
5
1 2 3 4 5
```

## Output

Output a single string, either "REALLOC!", "MALLOC!", or "CALLOC!", depending on the outcome of the implosion process.

```
MALLOC!
```

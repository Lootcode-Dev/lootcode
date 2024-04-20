# Dilemma

You're wandering through The Thicket, a dense and mysterious region filled with guilds known for their distinct ranks and roles. These guilds are like the living veins of The Thicket, organizing the denizens into a structured society. While navigating this labyrinthine forest, you realize that your current rank within the guilds is not prominent enough, prompting you to adopt the guise "0" to try and ascend the ranks, as names tend to sort themselves alphabetically.

In The Thicket, guild members are stratified by their highest held rank, which influences their visibility and influence within the community. For instance, guilds might have ranks such as Elder, Guardian, and Seeker. Members with the Elder rank are most visible and influential, appearing at the top of any gathering or assembly, followed by those holding the Guardian and then Seeker ranks (meaning you can hold any number of ranks at any time, but your highest rank determines your influence).

You have a record of various events within The Thicket that affect the visibility and ranking of its members, and your task is to determine the highest position you can achieve in these assemblies after each event, given that no one can surpass the simplicity and priority of the name "0".

## Input
The first line of input will contain a single positive integer, __c (c ≤ 30)__, representing the number of input cases to process. The input cases follow.

The first line of each case contains nonnegative integers __n (1 ≤ n ≤ 100,000)__, __q (1 ≤ q ≤ 300,000)__, and __r (r ≤ n)__, the number of ranks in the guild, the number of queries to process, and the number of ranks you currently hold, respectively. The next line has r distinct positive integers: the ith integer is __c_i (c_i ≤ n)__, the rank of the ith rank you currently hold. Role 1 is the highest role and role n is the lowest. By default, every user has the (n+1)th role (@commoner) so everyone always technically has a rank.

Then follow q lines, each fitting one of the following forms:

A X Y --y people with highest rank x log on.

B X Y --y people with highest rank x leave an assembly. It is guaranteed that there will be enough people to leave.

C X --rank x is added to your list of ranks (if it wasn't there before).

D X --rank x is removed from your list of ranks (if it was there before),

For all queries, 1 ≤ x ≤ n, 1 ≤ y ≤ 100.

```
2
3 8 0

A 2 1
B 2 1
A 3 1
A 2 1
C 1
C 3
C 2
D 1
6 7  6
6 5 4 1 2 3
A 1 5
A 2 5
A 3 7
D 1
B 1 4
C 1
A 6 100
```

## Output
After each query, output your current rank in the guild list, on a line by itself.

```
2
1
2
3
1
1
1
1
1
1
1
6
2
1
1
```
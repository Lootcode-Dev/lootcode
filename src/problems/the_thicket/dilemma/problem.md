# Dilemma

You're hanging out on your favourite Discord server, Corgi Lovers of Macon, when you realise that you're very low on the list of people currently online. Frustrated, you change your name from "i_love_pembroke corgis" to "0" in the hopes of getting to the top of the online list. What you forgot was that people are separated into categories by their highest discord role!
The Corgi Lovers of Macon Discord server has many Roles. Members are assigned these roles, and these roles separate people in the "Online" list into different groups based on highest role held (meaning you can hold any number of roles at any time, but your highest role determines your rank). For example, the server might have roles Admin, Moderator, and Platinum Corgi Fan, respectively. This means that all people online with the Admin role will appear at the top of the list (within the list, sorted lexicographically). Then are the people with the Moderator role, followed by the people with the Platinum Corgi Fan role.

You have a list of log-on and log-off events and you want to figure out the highest you can be on the Online list after each event, assuming that nobody has a lexicographically smaller username than "0" at any point.

## Input
The first line of input will contain a single positive integer, __c (c ≤ 30)__, representing the number of input cases to process. The input cases follow.

The first line of each case contains nonnegative integers __n (1 ≤ n ≤ 100,000)__, __q (1 ≤ q ≤ 300,000)__, and __r (r ≤ n)__, the number of roles on the server, the number of queries to process, and the number of roles you currently hold, respectively. The next line has r distinct positive integers: the ith integer is __c_i (c_i ≤ n)__, the rank of the ith role you currently hold. Role 1 is the highest role and role n is the lowest. By default, every user has the (n+1)th role (@everyone) so everyone always technically has a role.

Then follow q lines, each fitting one of the following forms:

A X Y --y people with highest role x log on.

B X Y --y people with highest role x log off. It is guaranteed that there will be enough people to log off.

C X --role x is added to your list of roles (if it wasn't there before).

D X --role x is removed from your list of roles (if it was there before),

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
After each query, output your current rank in the Online list, on a line by itself.

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
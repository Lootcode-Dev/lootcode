# The Dichomoton

"EVEN WITH A BRAIN OF ZEROS AND ONES, THE DICHOMOTON WILL AMOUNT TO MORE THAN YOU EVER WILL!"

The Dichomoton, towering at roughly 15 feet tall, is the ruling general of the Bitwise Bastions. But more than a militant legend, the Dichomoton is also directly responsible for the assembling and birthing of the Bitfolk. The Dichomoton, being locked in this tower for months, has grown increasingly irritated, and thus, will attack anything that walks into its quarters. Unfortunately, that is now you.

The Dichomoton will begin creating waves of Bitfolk soldiers in rapid succession, dispersing all of its built up creation energy at once. These waves of soldiers will follow a specification, and if you are able to determine the number of incoming waves of soldiers, you will be able to run past them and disable the Dichomoton long enough for you to lob it back to the Bastions. Don't worry, the only important part is the core on the back of its neck. You won't have to take back a massive 15 foot *construct* (robot is a pejorative term towards Bitfolk).

The waves will be assembled as such. The Dichomoton, has n non-negative integers (representing Bitfolk) and will divide all of them into several groups, where in each group, no pair of numbers have matching bit values among bits from 1-st to 31-st bit.

Formally, for any two numbers x and y in the same group, the condition x2(i) ≠ y2(i) must hold for all 1 ≤ i < 32. Each Bitfolk must fall into exactly one group.

If you are able to see the number of incoming waves, you will be able to find gaps in their defenses. Rush the Dichomoton, retrieve its core, and get it back to the Bastions before it is too late.
## Input

The first line contains a single integer n (1 ≤ n ≤ 2 * 10^5) — the total number of Bitfolk.

The second line contains n given integers a1,…,an (0 ≤ aj < 2^31).

```
4
1 4 3 4
```

## Output

Output a single integer — the minimum number of groups the Dichomoton will send at you.

```
4
```

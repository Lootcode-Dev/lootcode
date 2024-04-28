# The Tome of Equilibrium

"YOU THINK YOU KNOW IT ALL, DON'T YOU? GOOD LUCK GETTING THIS ONE BACK!"

At the core of Compendia, and more particularly, the Grand Compendian University, the Tome of Equilibrium is responsible for automatically sorting various aspects of the region with magic. Whether that be sorting the library, students into respective classes, creating schedules, or assigning IDs, the Tome of Equilibrium is essential for campus operations.

However, the Tome of Equilibrium has its limits. It requires a scholar, typically the dean or an expert bookkeeper, to continue powering it. Once it goes without power, the tasks delegated to the Tome build up, and must be done manually in order to kick start it once again. Every page represents a task, and... let's just say there are a LOT of pages left. This Tome is impossibly heavy from all of the pages, and you cannot pick it up! Maybe this is what happens when the Tome goes missing over finals week... A potential collapse at the university could be a cultural collapse in Compendia as we know it.

Each of these pages represents a requested final exam period at the university. To resolve the Tome of all of these pages, you need to find the total amount of exam time at the university given a number of intervals, representing start and end times. Keep in mind that overlapping exam intervals do not count more than once.

Hurry up and get this done... Getting the Tome back is important, but I bet the students are NOT happy with the uncertainty around finals week. Their lives are in danger, at least that is what they'd say.

## Input

The first line of input will contain an Integer *n (1 ≤ n ≤ 10^5)*, representing the number of intervals.
The next n lines will contain two space integers representing the first and second value in the interval, these values will not exceed 10^9 (some professors think 31 year long exams are necessary).

```
3
1 4
7 10
3 5
```

## Output

Output the sum of all the intervals only counting overlaps once, representing the amount of exam time this final exam season.

```
7
```
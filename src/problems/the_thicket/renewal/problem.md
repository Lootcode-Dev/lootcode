# Renewal

After months of preparation, the Tangled are ready to commence the annual Canopy Renewal, a ceremony said to keep the vigor and vitality of the Thicket alive.

The only aspect of the ceremony that remains to be determined is the size of the prayer grounds. An area of size *k* can support *k* Tangled praying simultaneously. The *n* priests in the covenant *(1 ≤ n ≤ 10,000)* are conveniently numbered 1...*n* in the order in which they must partake in the ceremony.

Each priest *i* plans to worship for a specific duration of time p(*i*). Initially, priests 1...*k* appear on the site and begin praying. When the first of these priests completes their part, they leave the stage and priest *k+1* immediately starts.

There are always *k* prayers occurring, until the end of the ceremony, when all priests have completed their worship. The ceremony ends when the last priest completes their worship, at time *t*.

Clearly, the larger the value of *k, the smaller the value of *t*. Since the ritual cannot last too long, you are given as input an upper bound *t-max* specifying the largest possible value of *t*. Subject to this
constraint, please determine the smallest possible value of K.

## Input

The first line of input contains *n* and *t-max*, where *t-max* is an integer of value at most 1,000,000.

The next *n* lines give the duration p(1)…p(*n*) of the prayer parts for priests 1..*n*. Each d(*i*) value is an integer in the range 1..100,000.

It is guaranteed that if *k* = *n*, the show will finish in time.

```
5 8
4
7
8
6
4
```

## Output

Print out the smallest possible value of *k* such that the ceremony will take no more than *t-max* units of time.

```
4
```
# Blind Spot

We have a new problem on our hands. We've been noticing that some of the commonfolk have been slipping through the cracks and making their way into the militant sections of the Bastions. This is a huge problem, as we can't have just anyone walking around with our military secrets. We need to find a way to identify these people and get them out of here. The biggest way to fix this is to find the blind spot in our watch tower systems.

Our defenses are being analyzed line by line, with each line being represented by a binary number. We need to find the largest blind spot in our defenses, or the largest distance between two _adjacent_ 1's in a line. We need your help to find this blind spots. We will be giving our segment as a decimal number, for your human brain to best understand.

For example, in the case of the number 22 the binary representation is 10110. The largest distance between two 1's is 2 (101 - distance of 2), so the output would be 2. In the case of 8, the binary representation is 1000. There is only one 1, and since there is no other adjacent 1, the output is 0.

## Input

The first line of input will be, _n (1 ≤ n ≤ 10^6)_, representing the amount of lines of defense. The next n lines of input will contain a single integer, _m (1 ≤ m ≤ 10^6)_, representing the decimal number of the line of defense.

```
2
22
8
```

## Output

Print each line of defenses largest blind spots in the order they were given.

```
2
0
```

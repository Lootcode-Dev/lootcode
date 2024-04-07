# Assemble

We need help assembling chips for our newest model of the Bitfolk. Unfortunately, we do not have the luxury of producing custom made parts, and we need to make do with what we have. We know the target voltage we need for a given assembly, and we have a list of capacitors with their respective voltages. We need to determine if we can assemble a chip that meets the target voltage.

Given a list of capacitors, determine if it is possible to assemble a chip that meets the target voltage, using any number of capacitors. You can only use each capacitor once.

For example, given a list of capacitors 3, 4, 5, 6 and a target voltage of 7, we can assemble a chip with a voltage of 7 by using the capacitors 3 and 4.

Please help us determine if we can assemble a chip that meets the target voltage.

## Input

The first line of input will be, _n (1 ≤ n ≤ 15)_, representing the number of capacitor. The next line will contain a single integer, _t (1 ≤ t ≤ 10^6)_, representing the target voltage. The next line will contain _n_ integers, _c (1 ≤ c ≤ 5 \* 10^6)_, representing the voltage of the capacitors.

```
4
7
3 4 5 6
```

## Output

Print YES if it is possible to assemble a chip that meets the target voltage. If yes, print the capacitor configurations that can be used to assemble the chip, sorted lexicographically (by first numbers, then by second, etc). If it is not possible to assemble a chip that meets the target voltage, print NO.

```
YES
3 4
```

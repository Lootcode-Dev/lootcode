# Answer

There is a classic tool known to most Queuesgardians, and that is the Queue Cipher. Upon further inspection, you notice it looks a lot like a calculator, but for some reason, the display always starts with a 0 and only has 3 buttons representing different operations.

```
(1) Add a
(2) Multiply by b
(3) Integer Division by c
```

where a, b, and c are given for each different calculator.
The screen displays exactly 6 digits, and when you attempt a calculation with a result one
million or greater, you realize that the display shows the last six digits of the actual correct
response and uses this value instead for the next calculation. (For example, if the display
showed 345678 and b = 3, if we press the button to multiply by 3, the resulting value will be
037034, the last six digits of the actual result. If we then pressed the integer divide button by c =
4, the new result would be 9258. Note that this is different than 1037034/4.) Given the constants
a, b, and c, described above, and a target integer, t, determine the minimum number of button
presses needed to obtain t on the calculator display.

## Input

Input will consist of a single line having four space-separated positive integers, __a__, __b__, __c__ and __t__, representing the additive constant, multiplicative constant, division constant and target value for the test case __(1 ≤ a, b, c ≤ 1000, 1 ≤ t ≤ 999999)__.

```
1 3 2 197
```

## Output

Output the minimum number of button presses necessary to obtain the target for the case. If it’s impossible to obtain the target, print out a -1 on a line by
itself instead.

```
11
```
# The Chronoqueue

Format a duration, given as a number of seconds, in a human-friendly way.

## Detailed rules
- The resulting expression is made of components like 4 seconds, 1 year, etc. In general, a positive integer and one of the valid units of time, separated by a space. The unit of time is used in plural if the integer is greater than 1.

- The components are separated by a comma and a space (", "). Except the last component, which is separated by " and ".

- More significant units of time will occur before than a least significant ones. Therefore, __1 second and 1 year__ is not correct, but __1 year and 1 second__ is. 

- Different components have different unit of times. So there is not repeated units like in __5 seconds and 1 second__.

- A component will not appear at all if its value happens to be zero. Hence, __1 minute and 0 seconds__ is not valid, it should be just __1 minute__.

- A unit of time must be used "as much as possible". It means that the function should not return __61 seconds__, but __1 minute and 1 second__ instead. Formally, the duration specified by of a component must not be greater than any valid more significant unit of time.

## Input

Input will consist of a non-negative integer.

```
62
```

## Output

If input is zero, output "now". Otherwise, output the duration expressed as a combination of years, days, hours, minutes, and seconds.

```
1 minute and 2 seconds
```
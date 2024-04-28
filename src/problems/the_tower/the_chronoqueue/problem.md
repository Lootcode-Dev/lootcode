# The Chronoqueue

"FOR EVERY GRAIN OF SAND IN THE CHRONOQUEUE IS A MISTAKE YOU HAVE MADE!"

Responsible for the order of birth, life, and death, the Chronoqueue is immensely powerful, and extremely important to the balance of Queuesgard. It has sat still in this tower for possibly even months now, and has ran the queue of time unchecked. Removing it from its chamber could have unintended consequences. Perhaps the buildup of life energy could cause the birth of a million Queuesguardians, causing unprecedented overpopulation. Or even worse, it could have the inverse effect, wiping the planet of the entire Queuesgard population.

As you stand before this massive Hourglass, you notice it is backed up and full of sand. After recalling a conversation during your time in Queuesgard, you remember that one grain of sand represents exactly one second of time. This information, paired with your newfound approximation skills from your time in Arithmend, can help you determine how much excess time there is in the Chronoqueue.

You will be given the number of grains of sand within the Chronoqueue, each representing a second. Don't worry about the accuracy of your approximation, you don't have time to be super precise. Keep in mind that this number may be incredibly large, so it doesn't really mean anything to you. You're going to have to convert the number of seconds in the Chronoqueue to a more understandable time, following the given rules:

## Detailed rules
- The resulting expression is made of components like 4 seconds, 1 year, etc. In general, a positive integer and one of the valid units of time, separated by a space. The unit of time is used in plural if the integer is greater than 1.

- The components are separated by a comma and a space (", "). Except the last component, which is separated by " and ".

- More significant units of time will occur before than a least significant ones. Therefore, __1 second and 1 year__ is not correct, but __1 year and 1 second__ is. 

- Different components have different unit of times. So there is not repeated units like in __5 seconds and 1 second__.

- A component will not appear at all if its value happens to be zero. Hence, __1 minute and 0 seconds__ is not valid, it should be just __1 minute__.

- A unit of time must be used "as much as possible". It means that the function should not return __61 seconds__, but __1 minute and 1 second__ instead. Formally, the duration specified by of a component must not be greater than any valid more significant unit of time.

By grasping the backup inside of the Chronoqueue, you will be able to reset the essence of time itself, and safely return this relic to the people of Queuesguard.

## Input

Input will consist of a non-negative integer, representing the grains of Chronoqueue sand (seconds).

```
62
```

## Output

If input is zero, output "now". Otherwise, output the duration expressed as a combination of years, days, hours, minutes, and seconds.

```
1 minute and 2 seconds
```
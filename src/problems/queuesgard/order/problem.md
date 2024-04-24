# Order

We desperatly need to gather our army, unfortunatly they are scattered all over Queuesgard and we have no way of ogranizing them. Each soldier has a specific queue assigned to them, but the soldiers are out of order!! If only there was a way we could direct them to their proper queues.

## Input

The first line of input will contain an integer __n (1 ≤ n ≤ 10^5)__ representing the amount of queues.

Next follow n lines:

- Each starting with some integer __m (0 ≤ m ≤ 10^3)__ representing the amount of soldiers in the queue.
- Followed by m integers each representing a soldier and the queue they should be in.

__For example if you found a soldier numbered 1 in the 0th queue they need to be in the 1st queue.__

```
3
3 2 1 0
3 2 1 1
3 0 0 2
```

## Output

Output the minimum number of times you have to take soldiers out of all queues to organize them. 

__After taking a soldier out of the queue they must immediatly be put in another queue.__

```
5
```

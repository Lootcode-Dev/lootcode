# Layered II

Well, it seems our engineers still don't get the memo. Assuming you've helped us out with our last layering problem, we've got another one for you. This time, we've got an order that's a bit more complicated. We need you to help us out with this one as well. Apparently, the CEO of our agency says that there is some _acceptable_ threshold of adjacency that we can allow. And really, if the amount is acceptable, we shouldn't waste our limited resources fixing it.

We've now been given a threshold of _k_ adjacent layers that we can allow. If we have more than _k_ adjacent layers that are the same, we need to remove them. We will keep removing _k_ layers at a time until our blueprint is "tolerable." While this makes little sense and will continue to diminish the sanctity of the spires, I guess I'm not the one in charge here. Maybe if I were, our engineers would quit making such trash blueprints in need of correcting...

For example, in the case of "DEEEDBBCCCBDAA" with a threshold of 3, we would remove the 3 E's, the 3 B's, and the 3 C's, leaving us with "DDBBBDAA". Then, we would remove the 3 B's leaving us with "DDDAA," and finally remove the 3 D's, leaving us with "AA". This would be our final blueprint, despite its lack of variety...

## Input

Input will consist of an integer _k (1 ≤ k ≤ 15)_, representing the threshold of adjacent layers that we can allow. The next line will contain a word of size _n (1 ≤ n ≤ 10000)_, representing a proposed blueprint for a spire. The word will only contain uppercase letters.

```
3
DEEEDBBCCCBDAA
```

## Output

Print the number of removal operations needed to make the blueprint valid. Then, print the blueprint after the removal operations.

```
4
AA
```

# The Arborithm

"HOW IRONIC, THE ARBORITHM IS SPEWING A PLAGUE AND ITS STILL LESS FAULTY THAN THAT MIND OF YOURS!"

In the heart of the Thicket, the verdant forest hums with a resonant life energy - that was until it lost its heart. The Arborithm rests at the root of the Thicket, dictating the winding paths, sentient trees, and life energy itself. You have seen that there is even an entire religion formed around it, so you should probably get that back.

The issue is, the Arborithm has reproduced a sub-ecosystem on the floor of the tower it resides on, attempting to create the home it has now lost. However, with lack of priests to keep the Arborithm in check, this process has become cancerous. The ecosystem created by the Arborithm has now plagued itself, making it increasingly hard to retrieve it. If you are to touch any of the withering plague, you too may rot. You don't think your flesh falling from your bone in seconds would be very enjoyable, so you aim to avoid the withering.

The region of the Arborithm's domain is represented by a white grid of n × m squares. The plagued regions will be created by infecting q horizontal and vertical black strokes. A stroke starts from square (x1, y1), ends at square (x2, y2) (x1 = x2 or y1 = y2) and infects all squares (x, y) to black where x1 ≤ x ≤ x2 and y1 ≤ y ≤ y2.

Here is an example of the sample input

![](https://www.lootcode.dev/problems/arborithm.png)

If you are able to determine the number of regions that are unaffected by the plague, you can identify with certainty points in which you will be safe. After doing so, you can navigate this malignant domain and retrieve the Arborithm to take back to the Thicket for safe keeping.

## Input

The first line of input contains three integers n, m and q (1 ≤ n, m ≤ 1000, 1 ≤ q ≤ 10^4).

Then follow q lines that describe the strokes. Each line consists of four integers x1, y1, x2 and y2 (1 ≤ x1 ≤ x2 ≤ n, 1 ≤ y1 ≤ y2 ≤ m). Either x1 = x2 or y1 = y2 (or both).

```
4 6 5
2 2 2 6
1 3 4 3
2 5 3 5
4 6 4 6
1 6 4 6
```

## Output

For each of the q strokes, output a line containing the number of safe regions as the plague takes its course.

```
1
3
3
4
3
```
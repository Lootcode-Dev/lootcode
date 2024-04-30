# Layered

I'm sure you've laid eyes on the beautiful Stackspires by now. The intricately detailed layers spanning as high as the eye can see. What delivers that marvelous sight, is the variety of different colors and forms of achitecture layered atop one another. The Stackspires are a marvel of modern engineering, and the envy of all who lay eyes upon them, but begin to look very boring once they lose that variety. Once the colors begin to blend together, our marvelous spires begin to look like a single, monotonous tower.

We've been tasked with the job of ensuring that the Stackspires remain as beautiful as they are, and to ensure the variety of its composition remains. Thus, we want to come up with an ideal blueprint for a spire, where each layer is different. Our engineers, however, have grown sloppy, and seemed to have written blueprints at a whim. We need your help to overhaul the blueprints and ensure that each layer is different from the one below it.

However, it is a bit more complicated than just removing layers. A layer is *two* adjacent floors, which are represented as letters. In the case of "ABBBA", the outcome is "B", since we remove *two* A's and *two" B's. Take the configuration of "ABBACA" for example. Once we remove the b-layer, we are left with "AACA", which is still not a valid configuration. We need to make sure that we keep removing layers of until we have it just right. Nothing less for the glory of the Stackspires!

## Input

The first line of input will be a word of size _n (1 ≤ n ≤ 10000)_, representing a proposed blueprint for a spire. The word will only contain uppercase letters.

```
ABBACA
```

## Output

Print the number of removal operations (1 removal is the deletion of a single layer, or two letters) needed to make the blueprint valid. Then, print the blueprint after the removal operations.

```
2
CA
```

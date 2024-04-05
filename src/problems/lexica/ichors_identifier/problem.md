# Ichors Identifier

Since our library is so damn big, an amazingly wonderful scholar named Ivon Ichor created an identifying system to process, track, and register new books in the Grand Hall! Patented as Ivon Ichor's Identifer System, this helps keep everything organized around here. We've had a recent tremor in the fiction section - happens all the time - but now we have a bunch of books in need of sorting.

The way it works - sequencing. Each book has long sequence of letters as its identifier, but of course its much more than that. Eventually we ran out of book spines long enough to store the full length IDs we needed, and thats where Ivon Ichor came in. Instead of the identifier being the letter sequence itself, instead, it is a combination of all subsequences of length 10 that appear more than once, conjoined in alphabetical order. Sounds complicated, but here is an example.

In the sequence XXXXXYYYYYXXXXXYYYYYXXXXXZZZKKK for example, the sequence YYYYYXXXXX and XXXXXYYYYY appear more than once. Now, we conjoin those sequences together alphabetically, with XXXXXYYYYY coming first and YYYYYXXXXX coming second, resulting in an Ichor Identifier of XXXXXYYYYYYYYYYXXXXX.

In all honesty, yeah it is complicated. And does it really extend the number of books we can store? Who knows, all I know is my boss loves this guy, so I do too...

## Input

Input will consist of a single string, representing the regular ID of a given book

```
XXXXXYYYYYXXXXXYYYYYXXXXXZZZKKK
```

## Output

Print the Ichor Identifier

```
XXXXXYYYYYYYYYYXXXXX
```


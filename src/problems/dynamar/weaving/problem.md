# Weaving

Weaving is a big part of our culture in Dynamar. While we are incredibly complex people, we still find ways to enjoy such complexity in our artistic expressions. Our grandmas here are like, crochet deities. However, I want to beat my grandma, and could use some help with weaving, but first, I need to know if it is even possible.

Given strings representing segments of yarn, s1, s2, and s3, find whether s3 is formed by a weaving of s1 and s2.

A weaving is done by taking the first character from either s1 or s2, cutting it off from the respective string and attaching that character to your new string you want to build s3.

You have to be able to build all of s3 with all of s2 and s1.

## Input
Input will consist of 3 lines, the first two lines contain strings s1 and s2. The third and last line will contain the string you want to build.

```
aabcc
dbbca
aadbbcbcac
```

## Output

Print true if it's possible to build the third string from the first and second strings, therefore out performing my grandma.

```
true
```

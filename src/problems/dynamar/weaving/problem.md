# Weaving

Given strings s1, s2, and s3, find whether s3 is formed by a weaving of s1 and s2.

Weaving is done by taking the first character from either s1 or s2, cutting it off from the respective string and attaching that character to your new string you want to build s3.

You have to be able to build all of s3 with all of s2 and s1.

## Input
Input will consist of 3 lines, the first two lines contain strings s1 and s2. The thrid and last line will contain the string you want to build.

```
aabcc
dbbca
aadbbcbcac
```

## Output

Print true if it's possible to build the third string from the first and second strings in the fashion specified, otherwise print false.

```
true
```

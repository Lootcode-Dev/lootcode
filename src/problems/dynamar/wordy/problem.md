# Wordy

Given a sequence of letters as well as subsequence from the original list, you are to count how
many times the particular subsequence occurs.

## Input

Input will consist of two non-empty strings of lowercase letters on seperate lines. The first of these strings is the
given input sequence while the second string will be the subsequence for which to search. 

It is guaranteed that the length of the first string is 1000 or less and that the length of the subsequence
is less than or equal to the length of the given sequence. Furthermore, it’s guaranteed that the
subsequence appears at least once in the sequence.

```
engineering
nine
```

## Output

For each test case, output a single line with the number of occurrences of the given subsequence.
The cases will be such that this value is less than 10^18.

```
2
```
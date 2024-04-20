# Correction

Typing on phones can be tedious. It is easy to make typing
mistakes, which is why most phones come with an autocorrect
feature. Autocorrect not only fixes common typos, but also suggests how to finish the word while you type it. Jenny has recently
been pondering how she can use this feature to her advantage, so
that she can send a particular message with the minimum amount of typing.


The autocorrect feature on Jenny’s phone works like this: the
phone has an internal dictionary of words sorted by their fre-
quency in the English language. Whenever a word is being typed,
autocorrect suggests the most common word (if any) starting with
all the letters typed so far. By pressing tab, the word being typed
is completed with the autocorrect suggestion. Autocorrect can
only be used after the first character of a word has been typed –
it is not possible to press tab before having typed anything. If no
dictionary word starts with the letters typed so far, pressing tab
has no effect.


Jenny has recently noticed that it is sometimes possible to use autocorrect to her advantage
even when it is not suggesting the correct word, by deleting the end of the autocorrected
word. For instance, to type the word “autocorrelation”, Jenny starts typing “aut”, which then
autocorrects to “autocorrect” (because it is such a common word these days!) when pressing
tab. By deleting the last two characters (“ct”) and then typing the six letters “lation”, the whole
word can be typed using only 3 (“aut”) + 1 (tab) + 2 (backspace twice) + 6 (“lation”) = 12
keystrokes, 3 fewer than typing “autocorrelation” without using autocorrect.
Given the dictionary on the phone and the words Jenny wants to type, output the minimum
number of keystrokes required to type each word. The only keys Jenny can use are the letter
keys, tab and backspace.

## Input

The first line of input contains two positive integers __n (1 ≤ n ≤ 10^5)__, the number of words in
the dictionary, and __m (1 ≤ m ≤ 10^5)__, the number of words to type. Then follow n lines with
one word per line, sorted in decreasing order of how common the word is (the first word is the
most common). No word appears twice in the dictionary. Then follow m lines, containing the
words to type.

The dictionary and the words to type only use lower case letters ‘a’-‘z’.

```
5 5
austria
autocorrect
program
programming
computer
autocorrelation
programming
competition
zyx
austria
```

## Output

For each word to type, output a line containing the minimum number of keystrokes required to type the corresponding word.

```
12
4
11
3
2
```
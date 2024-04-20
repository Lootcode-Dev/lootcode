# Correction

Writing inscriptions in the Thicket can be tedious, and it's super easy to make mistakes mid inscription. Thankfully, the trees being alive and all is helpful, and they usually get what we're trying to inscribe in a form of autocorrect. Autocorrect not only fixes common typos, but also suggests how to finish the word while you type it. We are trying to use this feature to our advantage to make writing less effort.


The autocorrect feature works like this: the
tree has an internal dictionary of words sorted by their frequency. Whenever a word is being typed,
autocorrect suggests the most common word (if any) starting with all the letters typed so far. By uttering the word "fill," the word being wrote is completed with the autocorrect suggestion. Autocorrect can only be used after the first character of a word has been typed –
it is not possible to incite "fill" before having typed anything. If no dictionary word starts with the letters typed so far, inciting a fill has no effect.


We have recently noticed that it is sometimes possible to use autocorrect to our advantage
even when it is not suggesting the correct word, by deleting the end of the autocorrected
word. For instance, to write the word “autocorrelation”, we start typing “aut”, which then
autocorrects to “autocorrect” (because it is such a common word these days!) when filling. By deleting the last two characters (“ct”) and then typing the six letters “lation”, the whole word can be typed using only 3 (“aut”) + 1 (fill) + 2 (delete twice) + 6 (“lation”) = 12
keystrokes, 3 fewer than typing “autocorrelation” without using autocorrect.

Given the common words and the words we wants to write, output the minimum number of operations required to write each word. The only operations we can use are writing a word, fill and deletion.

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
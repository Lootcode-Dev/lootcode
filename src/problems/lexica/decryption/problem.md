# Decryption

Pst.... I have a _secret_ to tell you. The kids around here like to be crafty and mischevious, as all kids do. Stemming from their imaginative yet simple minds, the kids have come up with a new way to send encrypted messages to one another. Perhaps in my youth I could have decoded these in my head, but I seem to have grown dull lately. As a teacher with a class of 42, this whole decoding things get tiring. Think I could get some help?

Yes? Great! The encryption they use works something like this... First, the ecoded message consists of a few words. Then, after that, is a long number, with a number of digits equal to the number of characters in the message, not counting spaces. To decode it, subtract the letter in the words by its corresponding digit, which is at the same position in the numbers as the word in the message. If you go into the negatives, say, _b - 2_, it wraps around to the end of the alphabet, resulting in _z_

Please help me figure out what these damn kids keep talking about. It's driving me crazy!

## Input
Input will consist of two lines. The first line contains  _n (1 ≤ n ≤ 100)_ words with the total length of characters not exceeding _10,000_, separated by spaces. The second line contains a series of _k_ numbers ranging from 0 to 9, which correspond to the shift key for a given letter.
```
igopt xqupi
1234512345
```

## Output
Output the decrypted word on its own line
```
hello world
```

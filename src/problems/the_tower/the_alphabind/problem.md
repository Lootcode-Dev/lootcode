# The Alphabind

Write a Morse code decoder for a wired electrical telegraph. 

An electric telegraph is operated on a 2-wire line with a key that, when pressed, connects the wires together, which can be detected on a remote station. The Morse code encodes every character being transmitted as a sequence of "dots" (short presses on the key) and "dashes" (long presses on the key).

When transmitting the Morse code, the international standard specifies that:

- "Dot" – is 1 time unit long.
- "Dash" – is 3 time units long.
- Pause between dots and dashes in a character – is 1 time unit long.
- Pause between characters inside a word – is 3 time units long.
- Pause between words – is 7 time units long.

However, the standard does not specify how long that "time unit" is. And in fact different operators would transmit at different speed. An amateur person may need a few seconds to transmit a single character, a skilled professional can transmit 60 words per minute, and robotic transmitters may go way faster.

We assume receiving the message is performed automatically by the hardware that checks the line periodically, and if the line is connected (the key at the remote station is down), __1__ is recorded, and if the line is not connected (remote key is up), __0__ is recorded. After the message is fully received, it gets to you for decoding as a string containing only symbols __0__ and __1__.

We want to turn the binary received from the electrical telegraph into morse code.

__Ignore leading and trailing zeros and if you have trouble discerning if the particular sequence of 1's is a dot or a dash, assume it's a dot.__

# Input

Input consists of a single string made up of 1's and 0's no more than 10^4 characters long representing the message sent by the electrical telegraph.

```
1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011
```

# Output

Output the morse code representation of the input. For this specific case the time unit was 2 characters.

```
.... . -.--   .--- ..- -.. .
```
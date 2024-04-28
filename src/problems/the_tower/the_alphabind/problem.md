# The Alphabind

"IM SURPRISED YOU EVEN KNOW HOW TO READ, LET ALONE BE ABLE TO READ THE DIVINE WORD OF THE UNIVERSE... GOOD LUCK DECODING THE ALPHABIND!"

The Alphabind holds all recorded language throughout all of Algorion across all of time. But more impressively, the Alphabind can translate the world itself, interpolating the meaning of existence, the universe, and the cosmos. This level of insight and understanding has allowed Lexica to create their lexicographical magic, thus making the Alphabind critical to the arcane power of Lexica.

You've found the Alphabind amidst the chaos of the tower, but you've quickly found yourself surrounded by armed traps and obstacles. Without divine intervention, you likely won't make it out alive. Lucky for you, with some clever deciphering, you *can* hear the divine. Or rather, you can read the divine energy of miracles through the pages of the Alphabind.

Due to the speechless nature of miracles, the best way to represent divinity is through a more complex medium, closely similar to Morse Code. This linguistic operates on the following rules: 

- "Dot" – is 1 time unit long.
- "Dash" – is 3 time units long.
- Pause between dots and dashes in a character – is 1 time unit long.
- Pause between characters inside a word – is 3 time units long.
- Pause between words – is 7 time units long.

Divinity enters the Alphabind as a series of zeroes and ones, representing pulses within the energy in the air, but does so at variable rates. This makes it impossible to strictly identify how long a "time unit" is. And in fact different frequencies of miracles would transmit at different speeds. On a good day, miracles may occur at 100 words per minute, or on bad days, just a few per hour.

We assume receiving the stream is performed automatically by the Alphabind that checks incoming waves periodically, and if the wave is connected (the resonance is positive), __1__ is recorded, and if the wave is not connected (the resonance is neutral), __0__ is recorded. After the stream is fully received, it gets to you for decoding as a string containing only symbols __0__ and __1__.

We want to turn the binary wave received from reality itself into Morse Code, in order to understand how the hell to get out of this mess. The Alphabind should be cooperative, it probably is eager to get back to its people too. You've seen what happened back at Lexica. Getting this book back means everything.

__Ignore leading and trailing zeros and if you have trouble discerning if the particular sequence of 1's is a dot or a dash, assume it's a dot.__

# Input

Input consists of a single string made up of 1's and 0's no more than 10^4 characters long representing the divine stream received by the Alphabind.

```
1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011
```

# Output

Output the Morse Code representation of the input. For this specific case the time unit was 2 characters.

```
.... . -.--   .--- ..- -.. .
```
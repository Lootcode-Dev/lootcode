# Elections

After many riveting hours of debate, the votes are finally in! That is if you call riveting utter boredom... I don't even know why we're holding these elections anymore, its not like the Grand Magistrate have anything to wield or protect anymore...

Either way, its not my job to speculate. Its my job to process the votes! I'd like your help though, theres a lot of ballots to sort through. I could use the extra set of eyes, I don't want to commit - _accidental_ - voters fraud.

## Input

Input will consist of _n (1 ≤ n ≤ 10^6)_, representing the number of candidate IDs to read in. The next line will consist of _n_ numbers, separated by spaces, representing a vote for a candidate with the ID of that given number.

```
14
1 1 2 3 1 2 1 1 2 1 1 3 3 3
```

## Output

Print "The Winner is _x_!", where x is the ID of the candidate with the most votes. In the event of a tie, print "There is a tie between _x_, _y_, ... and _z_!" where the candidates are sorted in ascending order by their ID. Then, print each candidate ID and their number of votes in the form "_x_: _y_" where _x_ is the ID and _y_ is the number of votes. Once again, in the event of a tie of votes, print the candidate with the lesser ID first.

```
The Winner is 1!
1: 7
3: 4
2: 3
```

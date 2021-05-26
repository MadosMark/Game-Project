![](https://c.tenor.com/zuCNy8k4DFAAAAAd/ugh-donald-trump.gif)

# The Trump Run

A 2D platformer where you play as the former president - Donald J Trump.
The goal is to collect coins and avoid obstacles for as long as you possibly can.

https://the-epic-trump-run.netlify.app/

# Changelog
  
  - [#1 - Added gravity change on reward collide](https://github.com/MadosMark/Game-Project/pull/16)
  - [#2 - New Player - Barack Obama gets to take over the game. Play now as Obama!](https://github.com/MadosMark/Game-Project/pull/18)
  - [#3 - Console.log() has been removed](https://github.com/MadosMark/Game-Project/pull/21)
  


# Code Review
By: Jon McGarvie & Joakim Sjögren.
1. `PlayScene.js:345-403` - This is repeated code and should be seperated into unique files using classes.
2. `PlayScene.js:236-339` - Why is the "this.trump.body.height" variable reassigned on every keypress?
3. `PlayScene.js:531` - The '<=' operator doesn't make any sense in this scenario.
4. `PreloadScene.js` - Good to split the code out, increases readability, especially things that aren't that important such as loading images :thumbsup:
5. Could use more comments in the code as it's hard to understand what everything does.
6. Nice sound effects!
7. `PlayScene.js:347-403` - Instead of using multiple if statements you could use a switch case to check the obsticleNum.
8. `index.html:52-56` - Good idea to have an image as instructions!
9. Gravity could be tweaked to make the game feel better to play.
10. `PlayScene.js:311-316` - You have forgotten to remove "console.log()".
11. Good job! :thumbsup:

# Testers

Tested by the following people:

1. Jon McGarvie
2. Joakim Sjögren
3. Moa Berg
4. Rikard Segerkvist

Tested by the following muggles (non-coders):

1. Sofia Mellberg
2. Axel White
3. Felicia
4. Martino

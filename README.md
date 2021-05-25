![](https://c.tenor.com/zuCNy8k4DFAAAAAd/ugh-donald-trump.gif)

# The Trump Run

A 2D platformer where you play as the former president - Donald J Trump.
The goal is to collect coins and avoid obstacles for as long as you possibly can.

https://the-epic-trump-run.netlify.app/

# Changelog

- https://github.com/MadosMark/Game-Project/tree/beta
  (Branch for experimenting with the game)

- https://github.com/MadosMark/Game-Project/tree/fullscreen
  (Branch with several cosmetics updates etc)

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
3.
4.

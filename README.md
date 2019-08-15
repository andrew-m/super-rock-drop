Super Rock Drop

An attempt at learning Electron JS by writing a simple clone of Super Foul Eggs without the use of any game engines.

It started with this article on writing a Game Loop https://www.sitepoint.com/quick-tip-game-loop-in-javascript/
Which was in turn inspired by this remarkable talk by Mary Rose Cook who live codes Space invaders, in Javascript, whilst explaining what she's doing to a conference audience. https://vimeo.com/105955605

This started as a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation.

### Install dependencies
npm install
### Run the tests
npm test
### Run the app
npm start


## Old Notes on the Game Engine:

As much as possible (and more as I understand what I'm doing) the Game Engine is a pure function.
It acts on the game state in a deterministic way, and holds no state of it's own.

external events are:
    clock ticks
    keyboard presses
    network events arriving.

Which result in changes to the game state
    such as blobs moving down
    or being created
    or moving side to side
    or disappearing

I aspire to make GameState immutable - the Blobs Array _is_ immutable (and needs to be).

## ToDo
New blobs in finite colours.
    Needs an idea of where randomness comes from.
    Is it inside the game engine or outside?
        Deterministic PRNG with state held in the game engine?
        External source of randomness?
        Random service available to the Game engine?

Have key for falling all the way intentionally (ie - drop down)
Perhaps space becomes drop, up becomes rotate?
    
Ignore keyboard events if no PC blobs (ie still animating)
Queue of Rock events needs to be processed before spawn events.
Same colour "pop" events.

Then onto two player land

```
Copyright 2019 Andrew Maddison

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

```
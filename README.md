# Usage

Copy [Viewport.tsx](src/Viewport.tsx) and [global.d.ts](src/global.d.ts) into your own project. Demo: []()

# Pixi-Viewport & React

Pixi.js is very useful. So is React. If you want to use both, there's now an [official way](https://react.pixijs.io/).

However, implementing scroll, zoom, pan, drag on you own is cumbersome, so there is [pixi-viewport](https://github.com/pixijs-userland/pixi-viewport). However, this is not directly compatible with pixi-react. The pixi-react docs suggests a [solution](https://react.pixijs.io/extend/) but this doesn't actually work on my end.

It seems `extend()` doesn't work properly on `Viewport` objects since they require an events parameter. Normal pixi components can be initialized without parameters. So we pass it in using 2 layers of wrappers and `useApplication` hook from pixi-react.

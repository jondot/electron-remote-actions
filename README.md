# electron-remote-actions

A tiny remoting library that applies actions in Electron, from the main process onto the renderer.

An example usage would be triggering global keyboard shortcut actions onto your actual rendered app.

## Quick Start

```
$ yarn add electron-remote-actions
```

We have to set up our `main` and `renderer` entrypoints in Electron.

### Renderer

Anywhere suitable (in your bootstrap code, store configuration, action creation), you need to register your _actions_.

An action is just a function. It can be a Redux action, MobX action or anything else.

Note that if it's a Redux action, you want to pre-bind it to a dispatch, meaning the action creator should also dispatch.

```javascript
const { AppRegistry } = require('electron-remote-actions')
const increment = () => ({ type: 'INCREMENT' })
AppRegistry.register(bindActionCreators({ increment }, store.dispatch))
```

Inside the registry, the action key (which we use below) is the string `'increment'`.

### Main Process

Over at the main process, you can now trigger actions:

```javascript
const { AppRegistry } = require('electron-remote-actions')
app.on('ready', () => {
  AppRegistry.onRegistered(() => {
    const increment = AppRegistry.get('increment')
    globalShortcut.register('CommandOrControl+Shift+X', increment)
  })
})
```

# Contributing

Fork, implement, add tests, pull request, get my everlasting thanks and a respectable place here :).

### Thanks:

To all [Contributors](https://github.com/jondot/hygen/graphs/contributors) - you make this happen, thanks!

# Copyright

Copyright (c) 2018 [Dotan Nahum](http://gplus.to/dotan) [@jondot](http://twitter.com/jondot). See [LICENSE](LICENSE.txt) for further details.

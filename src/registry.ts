export default class {
  actions = {}
  __onRegistered = () => {}

  register = (actionmap = {}) => {
    this.actions = actionmap
    this.syncMainFromRenderer()
    this.__onRegistered()
  }
  onRegistered = cb => {
    this.__onRegistered = cb
  }
  syncMainFromRenderer = () => {
    const { remote } = require('electron')
    const { AppRegistry } = remote.require(__dirname)
    AppRegistry.actions = this.actions
    this.__onRegistered = AppRegistry.__onRegistered
  }
  get(key) {
    const action = this.actions[key]
    if (action) {
      return action
    } else {
      throw new Error(
        `Electron bridge: no remote action found for given key '${key}'.\nAvailable actions:\n${Object.keys(
          this.actions
        ).join(',')}`
      )
    }
  }
}

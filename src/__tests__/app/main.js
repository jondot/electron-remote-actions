const path = require('path')
const url = require('url')
const { app, BrowserWindow } = require('electron')
const { AppRegistry } = require('../../../dist/index')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({ width: 800, height: 600 })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  )
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  app.increment = () => {
    AppRegistry.get('increment')()
  }
  app.decrement = () => {
    try {
      AppRegistry.get('decrement')
    } catch (err) {
      if (
        !err.toString().match(/Electron bridge: no remote action found for/)
      ) {
        app.quit()
      }
    }
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

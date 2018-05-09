import { Registry } from '../index'
import { createAction } from 'redux-actions'
import { Application } from 'spectron'
import path from 'path'

const shazam = createAction('SHAZAM')

describe('smoke test', () => {
  let app
  beforeEach(async () => {
    jest.setTimeout(20000)
    app = new Application({
      path: './node_modules/.bin/electron',
      args: [path.join(__dirname, 'app')],
      startTimeout: 20000
    })

    await app.start()
    await app.browserWindow.isVisible()
  })
  afterEach(async () => {
    if (app && app.isRunning()) {
      await app.stop()
    }
  })
  it('full cycle remote action', async () => {
    expect(await app.client.getText('#value')).toEqual('0')
    app.client.electron.remote.app.increment()
    expect(await app.client.getText('#value')).toEqual('1')
  })
  it('should not work if no such action', async () => {
    // app prematurely quits if the test fails, and that fails this test
    app.client.electron.remote.app.decrement()
  })
})

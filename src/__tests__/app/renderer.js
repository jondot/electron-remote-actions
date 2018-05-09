const { createStore, applyMiddleware, bindActionCreators } = require('redux')
const { AppRegistry } = require('../../../dist/index')
const reducers = require('./reducers')

const store = createStore(reducers, 0)

const increment = () => ({ type: 'INCREMENT' })

AppRegistry.register(bindActionCreators({ increment }, store.dispatch))
const valueEl = document.getElementById('value')

function render() {
  valueEl.innerHTML = store.getState().toString()
}

render()

store.subscribe(render)

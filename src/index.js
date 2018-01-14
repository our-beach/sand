import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css'

import * as actions from './actions'
import rootReducer from './reducers/rootReducer'
import App from './components/App'

registerServiceWorker()

const amplitude = x => ({ value: x })

const pixelToIndex = (screenWidth, bufferSize, x) =>
  Math.round((x * bufferSize) / screenWidth)

const pixelToAmplitude = (screenHeight, y) =>
  amplitude(1 - ((2 * y) / (screenHeight - 10)))

const onSetFrequency = frequency => {
  store.dispatch(actions.setFrequency(frequency))
  return store.dispatch(actions.setBeeperFrequency(frequency))
}

const onGestureStart = coords =>
      store.dispatch(actions.setMouseDown(coords))

const onGestureEnd = () =>
  store.dispatch(actions.setMouseUp())

const onMove = ([layerX, layerY]) => {
  const { amplitudes, mouse: { down, lastPosition } } = store.getState()
  const [lastX, lastY] = lastPosition

  if (down) {
    store.dispatch(actions.interpolateAmplitudes(
      pixelToIndex(store.getState().width, amplitudes.length, lastX),
      pixelToAmplitude(store.getState().width/2, lastY),
      pixelToIndex(store.getState().width, amplitudes.length, layerX),
      pixelToAmplitude(store.getState().width/2, layerY)
    ))

    const rampDuration = 0.1
    const data = store.getState().amplitudes.map(({ value }) => value);

    store.dispatch(actions.addBeeper(
      store.getState().frequency,
      data,
      rampDuration
    ))

    setTimeout(() => store.dispatch(
      actions.cleanupBeepers()),
      (rampDuration * 1000) + 10
    )

    store.dispatch(actions.setLastMousePosition([layerX, layerY]))
  }
  else
    return Promise.resolve(null)
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

window.onresize = () => store.dispatch(actions.setWidth(window.innerWidth))

const render = () =>
  ReactDOM.render(
    <App
      amplitudes={store.getState().amplitudes}
      width={store.getState().width}
      height={store.getState().width/2}
      onGestureStart={onGestureStart}
      onGestureEnd={onGestureEnd}
      onMove={onMove}
      frequency={store.getState().frequency}
      onSetFrequency={onSetFrequency}
    />,
    document.getElementById('root')
  )

store.subscribe(render)
render()

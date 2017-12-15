import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import * as actions from './actions'
import rootReducer from './reducers/rootReducer'
import WoolyWilly from './components/WoolyWilly'

registerServiceWorker()

const SCREEN_WIDTH = 700
const SCREEN_HEIGHT = 300

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
      pixelToIndex(SCREEN_WIDTH, amplitudes.length, lastX),
      pixelToAmplitude(SCREEN_HEIGHT, lastY),
      pixelToIndex(SCREEN_WIDTH, amplitudes.length, layerX),
      pixelToAmplitude(SCREEN_HEIGHT, layerY)
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

const render = () =>
  ReactDOM.render(
    <WoolyWilly
      amplitudes={store.getState().amplitudes}
      frequency={store.getState().frequency}
      width={SCREEN_WIDTH}
      height={SCREEN_HEIGHT}
      onGestureStart={onGestureStart}
      onGestureEnd={onGestureEnd}
      onMove={onMove}
      onSetFrequency={onSetFrequency}
    />,
    document.getElementById('root')
  )

store.subscribe(render)
render()

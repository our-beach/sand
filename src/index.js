import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import WoolyWilly from './WoolyWilly'

registerServiceWorker()

const setAmplitude = (amplitudes, targetIndex, targetValue) => {
  if (targetIndex >= amplitudes.length)
    return amplitudes
  else {
    const newAmplitudes = Array.from(amplitudes)
    newAmplitudes[targetIndex] = targetValue
    return newAmplitudes
  }
}

const amplitudes = (state = [], action) => {
  switch (action.type) {
    case 'SET_AMPLITUDE':
      return setAmplitude(state, action.index, action.value)
    default:
      return state
  }
}

const mouse = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MOUSE_DOWN':
      return { ...state, down: true }
    case 'SET_MOUSE_UP':
      return { ...state, down: false }
    default:
      return state
  }
}

const appReducer = combineReducers({
  amplitudes,
  mouse,
})

const amplitude = x => ({ value: x })
const initialState = {
  mouse: { down: false },
  amplitudes: Array(256).fill(null).map((_, idx) =>
    amplitude(Math.sin(idx / (10 * Math.PI)))
  ),
}

const store = createStore(
  appReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const onMouseDown = e => store.dispatch({
  type: 'SET_MOUSE_DOWN',
})

const onMouseUp = e => store.dispatch({
  type: 'SET_MOUSE_UP',
})

const SCREEN_WIDTH = 700
const SCREEN_HEIGHT = 300

const pixelToIndex = (screenWidth, bufferSize, x) =>
  Math.round((x * bufferSize) / screenWidth)

const pixelToAmplitude = (screenHeight, y) =>
  amplitude(1 - ((2 * y) / (screenHeight - 10)))

const onMove = e => {
  const { evt: { layerX, layerY } } = e
  const { amplitudes, mouse: { down } } = store.getState()

  if (down)
    return store.dispatch({
      type: 'SET_AMPLITUDE',
      index: pixelToIndex(SCREEN_WIDTH, amplitudes.length, layerX),
      value: pixelToAmplitude(SCREEN_HEIGHT, layerY),
    })
  else
    return Promise.resolve(null)
}

const render = () =>
    ReactDOM.render(
      <WoolyWilly
        amplitudes={store.getState().amplitudes}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMove={onMove}
      />,
      document.getElementById('root')
    )

store.subscribe(render)
render()


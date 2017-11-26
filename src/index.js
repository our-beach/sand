import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import WoolyWilly from './WoolyWilly'

registerServiceWorker()

const frequency = 440
const sampleRate = 44100

const bufferLength = Math.floor(sampleRate/frequency)

const setAmplitude = (amplitudes, targetIndex, targetValue) => {
  if (targetIndex >= amplitudes.length)
    return amplitudes
  else {
    const newAmplitudes = Array.from(amplitudes)
    newAmplitudes[targetIndex] = targetValue
    return newAmplitudes
  }
}

const interpolateAmplitudes = (amplitudes, startIndex, startValue, endIndex, endValue) => {
  if (endIndex < startIndex)
    return interpolateAmplitudes(
      amplitudes,
      endIndex,
      endValue,
      startIndex,
      startValue
    )

  const slope = (endValue.value - startValue.value) / (endIndex - startIndex)
  const prior = amplitudes.slice(0, startIndex)
  const posterior = amplitudes.slice(endIndex + 1)
  if (endIndex === startIndex)
    return prior.concat([endValue]).concat(posterior)
  const modified = amplitudes.slice(startIndex, endIndex + 1)
    .map(({ value }, idx) => amplitude((slope * idx) + startValue.value))

  return prior.concat(modified).concat(posterior)
}

const amplitudes = (state = [], action) => {
  switch (action.type) {
    case 'SET_AMPLITUDE':
      return setAmplitude(state, action.index, action.value)
    case 'INTERPOLATE_AMPLITUDES':
      return interpolateAmplitudes(
        state,
        action.startIndex,
        action.startValue,
        action.endIndex,
        action.endValue
      )
    default:
      return state
  }
}

const mouse = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MOUSE_DOWN':
      return {
        ...state,
        down: true,
        lastPosition: action.position
      }
    case 'SET_MOUSE_UP':
      return { ...state, down: false }
    case 'SET_LAST_MOUSE_POSITION':
      return {
        ...state,
        lastPosition: action.position
      }
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
  mouse: { down: false, lastPosition: [] },
  amplitudes: Array(bufferLength).fill(null).map((_, idx) =>
    amplitude(Math.sin(idx * 2 * Math.PI / bufferLength))
  ),
}

const store = createStore(
  appReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const onMouseDown = e => store.dispatch({
  type: 'SET_MOUSE_DOWN',
  position: [e.evt.layerX, e.evt.layerY],
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
  const { amplitudes, mouse: { down, lastPosition } } = store.getState()
  const [lastX, lastY] = lastPosition

  if (down) {
    store.dispatch({
      type: 'INTERPOLATE_AMPLITUDES',
      startIndex: pixelToIndex(SCREEN_WIDTH, amplitudes.length, lastX),
      startValue: pixelToAmplitude(SCREEN_HEIGHT, lastY),
      endIndex: pixelToIndex(SCREEN_WIDTH, amplitudes.length, layerX),
      endValue: pixelToAmplitude(SCREEN_HEIGHT, layerY),
    })

    store.dispatch({
      type: 'SET_LAST_MOUSE_POSITION',
      position: [layerX, layerY]
    })
  }
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

var audioCtx = new window.AudioContext({
  sampleRate: sampleRate,
})
var arrayBuffer = audioCtx.createBuffer(1, bufferLength, audioCtx.sampleRate)

// keeps track of the active audioSourceNode
var runningSource = null

const createNewBeeper = () => {
  var source = audioCtx.createBufferSource()
  source.connect(audioCtx.destination)
  for (var channel = 0; channel < arrayBuffer.numberOfChannels; channel++) {
    var nowBuffering = arrayBuffer.getChannelData(channel)
    for (var i = 0; i < arrayBuffer.length; i++) {
      var value = store.getState().amplitudes[i]['value']
      if (value !== null)
        nowBuffering[i] = value
    }
  }
  source.buffer = arrayBuffer
  source.loop = true
  source.start()
  return source
}

const beeper = () => {
  if (runningSource !== null)
    runningSource.stop()

  runningSource = createNewBeeper()
}

store.subscribe(beeper)
beeper()

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import WoolyWilly from './components/WoolyWilly'
import rampAudioNode from './audio/rampAudioNode'
import createBeeper from './audio/createBeeper'
import sineTable from './audio/sineTable'
import disconnectBeeper from './audio/disconnectBeeper'

registerServiceWorker()

const amplitude = x => ({ value: x })

const SCREEN_WIDTH = 700

const SCREEN_HEIGHT = 300

const pixelToIndex = (screenWidth, bufferSize, x) =>
  Math.round((x * bufferSize) / screenWidth)

const pixelToAmplitude = (screenHeight, y) =>
  amplitude(1 - ((2 * y) / (screenHeight - 10)))

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

  const modified = amplitudes
    .slice(startIndex, endIndex + 1)
    .map(({ value }, idx) => amplitude((slope * idx) + startValue.value))

  return prior.concat(modified).concat(posterior)
}

const addBeeper = ({ beepers, buffer }, data, rampDuration) => {
  const newBeeper = createBeeper(220, 0.3, data, rampDuration);
  rampAudioNode(beepers[0].gainNode, 0, rampDuration)

  return { beepers: [newBeeper, ...beepers], buffer }
}

const stopBeeper = beeper => {
  if (beeper.gainNode.gain.value === 0) {
    disconnectBeeper(beeper)
  }
  return beeper
}

const cleanupBeepers = ({ beepers }) => ({
  beepers: beepers.reduce((result, beeper) => {
    if (beeper.gainNode.gain.value === 0) {
      disconnectBeeper(beeper)
      return result
    }
    return [...result, beeper]
  }, [])
})

/////////////////START REDUCERS/////////////////

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

const audio = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_BEEPER':
      return addBeeper(state, action.buffer, action.rampDuration)
    case 'CLEAN_UP_BEEPERS':
      return cleanupBeepers(state)
    default:
      return state
  }
}
const frequency = (state = 0, action) => {
  switch (action.type) {
    case 'SET_FREQUENCY':
      return action.frequency
    default:
      return state
  }
}

const logarithmicScaleToFrequency = (power, arb = 20) =>
  (Math.pow(2, power) * arb).toFixed(2)

const appReducer = combineReducers({
  amplitudes,
  mouse,
  audio,
  frequency
})

/////////////////START ACTION CREATORS/////////////////

const actions = {
  setLastMousePosition: position => ({ type: 'SET_LAST_MOUSE_POSITION', position }),
  addBeeper: (buffer, rampDuration) => ({ type: 'ADD_BEEPER', buffer, rampDuration }),
  cleanupBeepers: () => ({ type: 'CLEAN_UP_BEEPERS' }),
  setMouseDown: position => ({ type: 'SET_MOUSE_DOWN', position }),
  setMouseUp: () => ({ type: 'SET_MOUSE_UP' }),
  setFrequency: frequency => ({
    frequency,
    type: 'SET_FREQUENCY',
  })
}

/////////////////START LISTENERS/////////////////

const onSetFrequencyByField = e =>
      store.dispatch(actions.setFrequency(e.target.value))

const onSetFrequencyBySlider = e =>
      store.dispatch(actions.setFrequency(
        logarithmicScaleToFrequency(e.target.value)
      ))

const onMouseDown = e =>
  store.dispatch(actions.setMouseDown([e.evt.layerX, e.evt.layerY]))

const onMouseUp = e =>
  store.dispatch(actions.setMouseUp())

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

    const rampDuration = 0.1
    const data = store.getState().amplitudes.map(({ value }) => value);
    store.dispatch(actions.addBeeper(data, rampDuration))
    setTimeout(() => store.dispatch(actions.cleanupBeepers()), (rampDuration * 1000) + 10)
    store.dispatch(actions.setLastMousePosition([layerX, layerY]))
  }
  else
    return Promise.resolve(null)
}
/////////START STARTING/////////

const initializeState = bufferLength => {
  const amplitudes = sineTable(bufferLength).map(amplitude);
  const data = amplitudes.map(({ value }) => value)
  const audio = { beepers: [createBeeper(220, 0.3, data, 0.5)] }

  return {
    mouse: { down: false, lastPosition: [] },
    amplitudes,
    audio,
  }
}

const store = createStore(
  appReducer,
  initializeState(1024),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const render = () =>
  ReactDOM.render(
    <WoolyWilly
      amplitudes={store.getState().amplitudes}
      width={SCREEN_WIDTH}
      height={SCREEN_HEIGHT}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMove={onMove}
      onSetFrequencyByField={onSetFrequencyByField}
      onSetFrequencyBySlider={onSetFrequencyBySlider}
    />,
    document.getElementById('root')
  )

store.subscribe(render)
render()

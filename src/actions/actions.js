// action creators
const actions = {
  interpolateAmplitudes: (startIndex, startValue, endIndex, endValue) => ({
    type: 'INTERPOLATE_AMPLITUDES',
    startIndex,
    startValue,
    endIndex,
    endValue,
  }),
  setLastMousePosition: (position) => ({
    type: 'SET_LAST_MOUSE_POSITION',
    position,
  }),
  addBeeper: (frequency, buffer, rampDuration) => ({
    type: 'ADD_BEEPER',
    frequency,
    buffer,
    rampDuration,
  }),
  cleanupBeepers: () => ({
    type: 'CLEAN_UP_BEEPERS',
  }),
  setBeeperFrequency: frequency => ({
    type: 'SET_BEEPER_FREQUENCY',
    frequency,
  }),
  setMouseDown: position => ({
    type: 'SET_MOUSE_DOWN',
    position,
  }),
  setMouseUp: () => ({
    type: 'SET_MOUSE_UP',
  }),
  setFrequency: frequency => ({
    type: 'SET_FREQUENCY',
    frequency,
  })
}

export default actions

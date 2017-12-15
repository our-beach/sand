// action creators
export const interpolateAmplitudes = (startIndex, startValue, endIndex, endValue) => {
  return {
    type: 'INTERPOLATE_AMPLITUDES',
    startIndex,
    startValue,
    endIndex,
    endValue
  }
}

export const setLastMousePosition = (position) => {
  return {
    type: 'SET_LAST_MOUSE_POSITION',
    position
  }
}

export const addBeeper = (frequency, buffer, rampDuration) => {
  return {
    type: 'ADD_BEEPER',
    frequency,
    buffer,
    rampDuration
  }
}

export const cleanupBeepers = () => {
  return {
    type: 'CLEAN_UP_BEEPERS'
  }
}

export const setBeeperFrequency = frequency => {
  return {
    type: 'SET_BEEPER_FREQUENCY',
    frequency
  }
}

export const setMouseDown = position => {
  return {
    type: 'SET_MOUSE_DOWN',
    position
  }
}

export const setMouseUp = () => {
  return {
    type: 'SET_MOUSE_UP'
  }
}

export const setFrequency = frequency => {
  return {
    type: 'SET_FREQUENCY',
    frequency
  }
}

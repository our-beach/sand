import sineTable from '../audio/sineTable'
import { BUFFER_LENGTH } from '../constants'

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

  return [...prior, ...modified, ...posterior]
}

const amplitude = x => ({ value: x })
const initialState = sineTable(BUFFER_LENGTH).map(amplitude)

const amplitudes = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AMPLITUDE':
      return setAmplitude(
        state,
        action.index,
        action.value,
      )
    case 'INTERPOLATE_AMPLITUDES':
      return interpolateAmplitudes(
        state,
        action.startIndex,
        action.startValue,
        action.endIndex,
        action.endValue,
      )
    default:
      return state
  }
}

export default amplitudes

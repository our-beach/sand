import createBeeper from '../audio/createBeeper'
import rampAudioNode from '../audio/rampAudioNode'
import disconnectBeeper from '../audio/disconnectBeeper'
import setSourceFrequency from '../audio/setSourceFrequency'
import sineTable from '../audio/sineTable'
import { INITIAL_FREQUENCY, BUFFER_LENGTH } from '../constants'

const addBeeper = ({ beepers, buffer }, frequency, data, rampDuration) => {
  const newBeeper = createBeeper(frequency, 0.3, data, rampDuration);
  rampAudioNode(beepers[0].gainNode, 0, rampDuration)

  return { beepers: [newBeeper, ...beepers], buffer: data }
}

const cleanupBeepers = ({ beepers, buffer }) => ({
  beepers: beepers.reduce((result, beeper) => {
    if (beeper.gainNode.gain.value === 0) {
      disconnectBeeper(beeper)
      return result
    }
    return [...result, beeper]
  }, []),
  buffer
})

const setBeeperFrequency = ({ beepers, buffer }, frequency) => {
  const [currentBeeper] = beepers
  setSourceFrequency(currentBeeper.source, frequency, buffer)
  return { beepers, buffer }
}
const amplitude = x => ({ value: x })
const amplitudes = sineTable(BUFFER_LENGTH).map(amplitude)
const data = amplitudes.map(({ value }) => value)

const initialState = {
  beepers : [createBeeper(INITIAL_FREQUENCY, 0.3, data, 0.5)],
  buffer: data
}

const audio = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BEEPER':
      return addBeeper(state,
        action.frequency,
        action.buffer,
        action.rampDuration
      )
    case 'CLEAN_UP_BEEPERS':
      return cleanupBeepers(
        state
      )
    case 'SET_BEEPER_FREQUENCY':
      return setBeeperFrequency(state,
        action.frequency
      )
    default:
      return state
  }
}

export default audio

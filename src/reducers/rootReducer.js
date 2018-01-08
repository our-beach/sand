import { combineReducers } from 'redux'

import amplitudes from './amplitudesReducer'
import audio from './audioReducer'
import mouse from './mouseReducer'
import frequency from './frequencyReducer'
import width from './widthReducer'

const rootReducer = combineReducers({
  amplitudes,
  mouse,
  audio,
  frequency,
  width
})

export default rootReducer

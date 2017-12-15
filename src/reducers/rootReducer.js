import { combineReducers } from 'redux'

import amplitudes from './amplitudesReducer'
import audio from './audioReducer'
import mouse from './mouseReducer'
import frequency from './frequencyReducer'

const rootReducer = combineReducers({
  amplitudes,
  mouse,
  audio,
  frequency
})

export default rootReducer

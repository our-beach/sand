import { INITIAL_FREQUENCY } from '../constants'

const initialState = INITIAL_FREQUENCY

const frequency = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FREQUENCY':
      console.log("ADD")
      return action.frequency
    default:
      return state
  }
}

export default frequency

import { leastOf } from '../math'

const initialState = leastOf(window.innerWidth, 736) - 16

const width = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WIDTH':
      return leastOf(action.width, 736) - 16
    default:
      return state
  }
}

export default width

const initialState = {
  down: false,
  lastPosition: [],
}

const mouse = (state = initialState, action) => {
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

export default mouse

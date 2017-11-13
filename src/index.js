import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';

registerServiceWorker()

const defaultState = []
for (let i = 0; i < 120; i++) {
    defaultState[i] = 0
}

const counter = (state = defaultState, action) => {
    switch(action.type) {
        case "INCREMENT":
            return [
                ...state.slice(0, action.index),
                incrementAt(state, action.index),
                ...state.slice(action.index + 1)
            ]
        case "DECREMENT":
            return [
                ...state.slice(0, action.index),
                decrementAt(state, action.index),
                ...state.slice(action.index + 1)
            ]
        default:
            return state
    }
}

const incrementAt = (state, index) => state[index] + 1
const decrementAt = (state, index) => state[index] - 1

const store = createStore(counter,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const onIncrement = (index) => {
    return () => {
        return store.dispatch(actionWithIndex(incrementAction, index))
    }
}

const onDecrement = (index) => {
    return () => {
        return store.dispatch(actionWithIndex(decrementAction, index))
    }
}

const actionWithIndex = (action, index) => {
    return Object.assign({}, action, {index: index})
}

const render = () =>
    ReactDOM.render(
        <App count={ store.getState() }
             increment={ onIncrement }
             decrement={ onDecrement } />,
        document.getElementById('root')
    )

store.subscribe(render)
render()

const incrementAction = {
    type: "INCREMENT"
}

const decrementAction = {
    type: "DECREMENT"
}
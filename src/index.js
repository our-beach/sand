import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';

registerServiceWorker();

const counter = (state = 0, action) => {
    switch(action.type) {
        case "INCREMENT":
            return state + 1
        case "DECREMENT":
            return state - 1
        default:
            return state
    }
}

const store = createStore(counter,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const increment = () => store.dispatch(incrementAction)
const decrement = () => store.dispatch(decrementAction)
const dumb = () => store.dispatch(dumbAction)

const render = () =>
    ReactDOM.render(
        <App count={ store.getState() }
             increment={ increment }
             decrement={ decrement }
             dumb={ dumb} />,
        document.getElementById('root')
    );

store.subscribe(render)
render()

const incrementAction = {
    type: "INCREMENT",
}

const decrementAction = {
    type: "DECREMENT",
}

const dumbAction = {
    type: "DUMB",
}

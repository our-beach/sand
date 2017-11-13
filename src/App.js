import React from 'react';
import logo from './logo.svg';
import './App.css';

export default function App(props) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Our first stuff.
        </p>
        <div onClick={ props.increment }>
            +
        </div>
        <div>
            { props.count }
        </div>
        <div onClick={ props.decrement }>
            -
        </div>
        <div onClick={ props.dumb }>
            dumb
        </div>
      </div>
    );
}

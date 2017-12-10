import React from 'react';
import logo from './logo.svg';
import Counter from './Counter.js'
import './App.css';

export default function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        Please enter your phone number:
      </p>
      <div className="Counters">
        {props.count.map((value, index) => {
            return <Counter
                increment={ props.increment(index) }
                decrement={ props.decrement(index) }
                counter={value}
                key={index}/>
            })
        }
      </div>
    </div>
  );
}

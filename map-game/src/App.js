import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GeoQuiz from './components/GeoQuiz.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>placeholder header text</h2>
        </div>
        <GeoQuiz />
      </div>
    );
  }
}

export default App;

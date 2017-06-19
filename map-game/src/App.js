import React, { Component } from 'react';
import './App.css';
import GeoQuiz from './components/GeoQuiz.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Geo Quiz</h2>
        </div>
        <GeoQuiz />
      </div>
    );
  }
}

export default App;

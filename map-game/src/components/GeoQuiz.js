import React, { Component } from 'react';

class GeoQuiz extends Component {
  render() {
    return (
      <div className="GeoQuiz">
        <div id="game-title">Geographic Border Quiz</div>
        <div className="GMap">
          {/* Display the Google Maps API view of one (next step: a select country, then: only the country border) */}
        </div>
      </div>
    );
  }
}

export default GeoQuiz;

import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker, OverlayView } from "react-google-maps";

import mapStylesWithoutLabels from "./mapStylesWithoutLabels.json";
// import mapStylesWithLabels1 from "./mapStylesWithLabels1.json";

import { COUNTRIES } from './countries.js';

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/* Choose a random country */
const randomCountry = COUNTRIES[getRandomInt(0,244)];
/* Pull out the { Latitude, Longitude } as an object, and Name as a string */
const randomCountryLatLong = { lat: randomCountry[1], lng: randomCountry[2] }
const randomCountryName = randomCountry[3]
console.log("Random Country: " + randomCountry)
const STYLES = {
  overlayView: {
    background: 'white',
    border: 'none',
    borderRadius: `10%`,
    padding: 15
  }
};

/* TODO: Refactor Quiz portion into a new React component class */
function getPixelPositionOffset(width, height) {
  return { x: -(140 + (width / 2)), y: -(140 + (height / 2)) };
}


function handleSubmit(e) {
  const rmap = ('in handleSubmit')
  console.log(rmap);
  e.preventDefault();
}


const GeoGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={4}
    defaultCenter={ randomCountryLatLong }
    defaultOptions={{ styles: mapStylesWithoutLabels }}
    onClick={props.onMapClick}
  >
    <Marker
      position={randomCountryLatLong}
      key={randomCountryName}
    />
    <OverlayView
      position={randomCountryLatLong}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div style={STYLES.overlayView}>
        <form id="quiz" onSubmit={handleSubmit}>

            <div>

              <label>{COUNTRIES[1][3]}<input type="radio" name="geo-quiz-answers" id="geo-quiz-answers-A" value="A" /></label>

            </div>

            <div>

              <label>B <input type="radio" name="geo-quiz-answers" id="geo-quiz-answers-B" value={randomCountryName} /></label>

            </div>

            <div>

              <label>{randomCountryName}C <input type="radio" name="geo-quiz-answers" id="geo-quiz-answers-C" value="C" /></label>

            </div>

            <div>

              <label>{randomCountryName}D <input type="radio" name="geo-quiz-answers" id="geo-quiz-answers-D" value="D" /></label>

            </div>

            <div>

              <label>{randomCountryName}E <input type="radio" name="geo-quiz-answers" id="geo-quiz-answers-E" value="E" /></label>

            </div>

          <input type="submit" value="Submit Quiz" />

        </form>

      </div>

    </OverlayView>
  </GoogleMap>
));

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: randomCountryName
    }
  }
  handleMapLoad = this.handleMapLoad.bind(this);

  handleMapLoad(map) {
    this.mapComponent = map;
    if (map) {
      console.log("Zoom: " + map.getZoom());
    }
    //
    // const makeRequest = function() {
    //   displayRandomCountry();
    // };
    //
    // function displayRandomCountry() {
    //   /* diplay a list of five options, four wrong, one correct, in an Overlay  */
    // }
    // makeRequest();
  }

  render() {
    return (
      <div style={{height: `500px`}}>
      <div id="geo-quiz-answer" style={{display: `block`, height: `20px`}}>
        {randomCountryName}
      </div>
      <GeoGoogleMap
          containerElement={<div style={{  height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMapLoad={this.handleMapLoad}
        />
      </div>

    );
  }
}

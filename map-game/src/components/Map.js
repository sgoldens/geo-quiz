import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker, Overlay } from "react-google-maps";

import mapStylesWithoutLabels from "./mapStylesWithoutLabels.json";
// import mapStylesWithLabels1 from "./mapStylesWithLabels1.json";

import { COUNTRIES } from './countries.js';

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/* Choose a random country */
let randomCountry = COUNTRIES[getRandomInt(0,244)];
/* Pull out the { Latitude, Longitude } as an object, and Name as a string */
let randomCountryLatLong = { lat: randomCountry[1], lng: randomCountry[2] }
let randomCountryName = randomCountry[4]
console.log("Random Country: " + randomCountry)

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
  </GoogleMap>
));

export default class Map extends Component {
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
        <GeoGoogleMap
          containerElement={<div style={{  height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMapLoad={this.handleMapLoad}
        />
      </div>
    );
  }
}

import React, { Component } from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";

import mapStyles from "./mapStyles.json";

const GeoGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={2}
    defaultCenter={{ lat: 42.4242424, lng: -42.4242424 }}
    defaultOptions={{ styles: mapStyles }}
    onClick={props.onMapClick}
  >
  </GoogleMap>
));

export default class Map extends Component {
  handleMapLoad = this.handleMapLoad.bind(this);

  handleMapLoad(map) {
    this.mapComponent = map;
    if (map) {
      console.log("Zoom: " + map.getZoom());
    }

    const makeRequest = function() {
      displayRandomCountry();
    };

    function displayRandomCountry() {
      console.log('inside displayRandomCountry()')
      /* display a random country */
    }
    makeRequest();
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

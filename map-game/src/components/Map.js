import React, { Component } from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";

const GeoGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: 38.4758956, lng: -105.9172295 }}
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
          containerElement={<div style={{ height: `100%`
          /* */
          }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMapLoad={this.handleMapLoad}
        />
      </div>
    );
  }
}

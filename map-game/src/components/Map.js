import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const GeoGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={4}
    defaultCenter={ props.randomCountryLatLong }
    defaultOptions={{ styles: props.defaultOptions }}
    onClick={props.onMapClick}
  >
    <Marker
      position={ props.randomCountryLatLong }
      key={ props.randomCountryName }
    />

  </GoogleMap>
));

export default class Map extends Component {

  randomCountryLatLong() {
    return this.props.randomCountryLatLong
  }

  styles() {
    return this.props.defaultOptions.styles
  }

  render() {
    const passedLatLong = this.randomCountryLatLong()

    const styles = this.styles()

    return (
      <div style={{height: `300px`}}>
        <GeoGoogleMap
            containerElement={<div style={{  height: `100%`, width: `100%` }} />}
            mapElement={<div style={{ height: `100%`, width: `100%` }} />}
            counter={this.counter}
            randomCountryLatLong={ passedLatLong }
            defaultOptions= { styles }
        />
      </div>
    );
  }
}

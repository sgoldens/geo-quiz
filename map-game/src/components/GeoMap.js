import React, { Component } from 'react'
import Map from './Map'

class GeoMap extends Component {
  render() {
    return (
      <div className="GeoMap">
        <div id="map">
          <Map />
        </div>
      </div>
    );
  }
}

export default GeoMap;

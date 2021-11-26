import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { gameLength } from '../../../api/quizQuestions'

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoic2dvbGRlbnMiLCJhIjoiY2o1MGJnb3RhMDQxbDMzcXZlb25ydmViaiJ9.6ZepZGQEwgk6NHE6XdBvQg"
});

export default class GeoMap extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.counter < (gameLength +1)
  }

  correctCountryLatLong() {
    return this.props.correctCountryLatLong
  }

  questionId() {
    return this.props.questionId
  }

  render() {
    const passedLatLong = this.correctCountryLatLong()
    const styles = {style: "mapbox://styles/sgoldens/cj52m3l5v2en72sns41khdr1a"}
    const questionId = this.questionId()
  
    return (

      <Map
        questionId={questionId}
        style={styles.style}
        center={passedLatLong}
        zoom="4"
        containerStyle={{
          height: "80vh",
          width: "45%   ",
          float: "right",
          clear: "both"
        }}>
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15", "icon-size": 2 }}>
            <Feature coordinates={passedLatLong} onChange={this.onChange} value={this.props.coordinates} />
          </Layer>
      </Map>

    );
  }
}

import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";
import { TrackPoint } from "../../../domain/domainClasses.js";

const center = {
  lat: 0,
  lng: -180,
};

/*global Props*/
/*eslint no-undef: "error"*/
class Map extends Component<Props> {
  constructor(props) {
    super(props);

    this.completePolyline = this.completePolyline.bind(this);
  }

  completePolyline(polyline) {
    if (this.props.getPolyline() !== null) {
      this.props.getPolyline().setMap(null);
      return;
    }

    const trackPointList = [];
    polyline.getPath().forEach((latLng) => {
      trackPointList.push(new TrackPoint(latLng.lat(), latLng.lng()));
    });

    this.props.setPolyline(polyline);
    this.props.setWaypoints(trackPointList);
  }

  render() {
    return (
      <GoogleMap
        id="mapRouteCreator"
        zoom={2}
        resetBoundsOnResize
        mapContainerStyle={{
          "max-height": "calc(100vh - 180px)",
          height: "800px",
          width: "100%",
          padding: "1rem 3.5rem",
        }}
        loadingElement={<div>Loading...</div>}
        center={center}
      >
        <DrawingManager
          defaultDrawingMode={window.google.maps.drawing.OverlayType.POLYLINE}
          defaultOptions={{
            drawingControl: true,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [window.google.maps.drawing.OverlayType.POLYLINE],
            },
          }}
          onPolylineComplete={this.completePolyline}
        />
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));

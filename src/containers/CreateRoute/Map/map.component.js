import React, { Component } from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Polyline
} from "react-google-maps";
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";

const center = {
    lat: 0,
    lng: -180,
}


class Map extends Component<Props>{

    constructor(props) {
        super(props);

        this.completePolyline = this.completePolyline.bind(this);

    }

    completePolyline(polyline) {

        const list = []
        polyline.getPath().forEach(latLng => {
            list.push({
                latitude: latLng.lat(),
                longitude: latLng.lng()
            });
        });

        alert(list)
        this.props.setWaypoints(list);

        alert(list);

        
    }



    render() {
        return (
            <>
                <GoogleMap
                    id="mapRouteCreator"
                    zoom={2}
                    resetBoundsOnResize
                    mapContainerStyle={{
                        "max-height": "calc(100vh - 180px)",
                        height: "800px",
                        width: "100%",
                        padding: "1rem 3.5rem"
                    }}
                    onLoad={() => console.log("map loaded")}
                    loadingElement={<div>Loading...</div>}
                    center={center}

                >
                    <DrawingManager
                        defaultDrawingMode={window.google.maps.drawing.OverlayType.POLYLINE}
                        defaultOptions={{
                            drawingControl: true,
                            drawingControlOptions: {
                              position: window.google.maps.ControlPosition.TOP_CENTER,
                              drawingModes: [window.google.maps.drawing.OverlayType.POLYLINE]
                            }
                          }}
                        onPolylineComplete={this.completePolyline}
                    />
                </GoogleMap>

            </>
        );
    }

}

export default withScriptjs(withGoogleMap(Map));









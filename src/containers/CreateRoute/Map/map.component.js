import React, { Component } from "react";
import { LoadScript, GoogleMap, Polyline, DrawingManager } from "@react-google-maps/api";


const center = {
    lat: 0,
    lng: -180,
}
const bootstrapURLKeys={
    key: "AIzaSyBMF5XiwVXHrXjoCp0EsBbGoeKW08lHoo0",
    libraries: ['drawing'].join(','),
  }

export default class Map extends Component<Props>{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const script = document.createElement("script");

        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMF5XiwVXHrXjoCp0EsBbGoeKW08lHoo0&libraries=drawing";
        script.async = true;

        document.body.appendChild(script);
    }

    PolylineToList(polyline) {

        waypoints = []
        polyline.getPath().forEach( latLng => {
            waypoints.push({
                latitude:latLng.lat(),
                longitude:latLng.lng()
            });
        });

        return waypoints;
    }

    completePolyline(){
        this.props.setWaypoints(this.PolylineToList(poly));
    }
    
    

    render() {
        return (
            <>
                <LoadScript id="script-loader" googleMapsApiKey="AIzaSyBMF5XiwVXHrXjoCp0EsBbGoeKW08lHoo0">
                    <GoogleMap
                    bootstrapURLKeys={bootstrapURLKeys}
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
                            defaultDrawingMode={google.maps.drawing.OverlayType.POLYLINE}
                            onPolylineComplete={this.completePolyline}
                        /> 
                    </GoogleMap>
                </LoadScript>

            </>
        );
    }

}










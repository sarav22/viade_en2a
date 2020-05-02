import React from "react";
import { LoadScript, GoogleMap, Polyline } from "@react-google-maps/api";
import { MapCard } from './map.style';

/**
 * Map Page UI component, containing the styled components for the Map Page
 * @param props
 */
const MapEmpty = props => {
  const {centralLat} = props;
  const {centrarLong} = props;

  return (
    <div>
      <MapCard>
      <LoadScript id="script-loader" googleMapsApiKey="AIzaSyBMF5XiwVXHrXjoCp0EsBbGoeKW08lHoo0">
        <GoogleMap
          id="mapView"
          zoom={12}
          resetBoundsOnResize
          mapContainerStyle={{
            "max-height": "calc(100vh - 180px)",
            height: "800px",
            width: "100%",
            padding: "1rem 3.5rem"
          }}
          onLoad={() => console.log("map loading")}
          loadingElement={<div>Loading...</div>}
          center={{
            lat: centralLat,
            lng: centrarLong
          }}
        >
          <Polyline
            geodesic={true}
            options={{
              strokeColor: "#ff0000",
              strokeOpacity: 1,
              strokeWeight: 6,
              icons: [
                {
                  offset: "0",
                  repeat: "10px"
                }
              ]
            }}
          />
        </GoogleMap>
      </LoadScript>
      </MapCard>
    </div>
  );
};

export default MapEmpty;

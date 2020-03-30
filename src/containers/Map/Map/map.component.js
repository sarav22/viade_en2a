import React from "react";
import { useTranslation } from "react-i18next";
import { MapRouteName } from "./map.style";
import { LoadScript, GoogleMap, Polyline } from "@react-google-maps/api";

/**
 * Map Page UI component, containing the styled components for the Map Page
 * @param props
 */
const Map = props => {
  const { route } = props;
  const { t } = useTranslation();

  const routePath = [];
  route.itinerary.forEach(trackPoint => {
    routePath.push({
      lat: trackPoint.latitude,
      lng: trackPoint.longitude
    });
  });

  return (
    <div>
      <h3>
        {t("mapView.viewTitle")} <MapRouteName>{route.name}</MapRouteName>
      </h3>

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
            lat: routePath[0].lat,
            lng: routePath[0].lng
          }}
        >
          <Polyline
            geodesic={true}
            options={{
              path: routePath,
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
    </div>
  );
};

export default Map;

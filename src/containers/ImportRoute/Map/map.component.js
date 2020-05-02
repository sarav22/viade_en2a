import React from "react";
import { useTranslation } from "react-i18next";
import {
  LoadScript,
  GoogleMap,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import { Loader } from "@util-components";
import { MapRouteName } from "./map.style.js";
import { MapCard } from "./map.style";

/**
 * Map Page UI component, containing the styled components for the Map Page
 * @param props
 */
const Map = (props) => {
  const { routeArray } = props;
  const { t } = useTranslation();

  return (
    <div>
      <MapRouteName>{t("mapView.importedRoutesTitle")}</MapRouteName>

      <MapCard>
        <LoadScript
          id="script-loader"
          googleMapsApiKey="AIzaSyBMF5XiwVXHrXjoCp0EsBbGoeKW08lHoo0"
        >
          <GoogleMap
            id="mapView"
            zoom={12}
            resetBoundsOnResize
            mapContainerStyle={{
              "max-height": "calc(100vh - 180px)",
              height: "800px",
              width: "100%",
              padding: "1rem 3.5rem",
            }}
            loadingElement={<Loader />}
            center={{
              lat: routeArray[0].itinerary[0].latitude,
              lng: routeArray[0].itinerary[0].longitude,
            }}
          >
            {routeArray.map((route) => {
              return (
                <Marker
                  title={route.name}
                  position={{
                    lat: route.itinerary[0].latitude,
                    lng: route.itinerary[0].longitude,
                  }}
                />
              );
            })}
            {routeArray.map((route) => {
              let routePath = [];
              route.itinerary.forEach((trackPoint) => {
                routePath.push({
                  lat: trackPoint.latitude,
                  lng: trackPoint.longitude,
                });
              });
              return (
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
                        repeat: "10px",
                      },
                    ],
                  }}
                />
              );
            })}
          </GoogleMap>
        </LoadScript>
      </MapCard>
    </div>
  );
};

export default Map;

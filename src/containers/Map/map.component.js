import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  MapWrapper,
  MapCard,
  MapRouteName,
  StyledGoogleMap
} from './map.style';
import {
  LoadScript,
  GoogleMap
} from '@react-google-maps/api'

/**
 * Map Page UI component, containing the styled components for the Map Page
 * @param props
 */
export const MapPageContent = props => {
  const { webId, name } = props;
  const { t } = useTranslation();
  const mapCenter = {
    lat: 0,
    lng: -180,
  }
  
  return (

    <div>
      <MapCard className="card">
        <h3>
          {t('mapView.viewTitle')} <MapRouteName>{name}</MapRouteName>
        </h3>

  
      <LoadScript
        id="script-loader"
        googleMapsApiKey=""
      >

        <GoogleMap
          id='mapView'
          zoom={10}
          resetBoundsOnResize
          mapContainerStyle={{
            height: "500px",
            width: "100%",
            padding: "1rem 3.5rem"
          }}
          onLoad={() => console.log("map loading")}
          loadingElement={<div>Loading...</div>}
          center={{
            lat: -34.397,
            lng: 150.644
          }}
        >
          
        </GoogleMap>
      </LoadScript>
      </MapCard>
    </div>

  );

};

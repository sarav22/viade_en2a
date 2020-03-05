import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  MapRouteName
} from './map.style';
import {
  LoadScript,
  GoogleMap,
  Polyline
} from '@react-google-maps/api'

/**
 * Map Page UI component, containing the styled components for the Map Page
 * @param props
 */
 const Map = props => {
  const { webId, name } = props;
  const { t } = useTranslation();
  const mapCenter = {
    lat: 0,
    lng: -180,
  }
  
  return (

    <div>
        <h3>
          {t('mapView.viewTitle')} <MapRouteName>{name}</MapRouteName>
        </h3>

  
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyAblM_CWZSOUgwMdvTONj3yHn3pHkJikNE"
      >

        <GoogleMap
          id='mapView'
          zoom={17}
          resetBoundsOnResize
          mapContainerStyle={{
            height: "800px",
            width: "100%",
            padding: "1rem 3.5rem"
          }}
          onLoad={() => console.log("map loading")}
          loadingElement={<div>Loading...</div>}
          center={{
            lat: 3.028846373870724,
            lng: 101.62019493865353
          }}
        >
          <Polyline   geodesic={true}
            options={{
                path: [   
                  {"lat": 3.028846373870724, "lng": 101.62019493865353},
                  {"lat": 3.0293392107899226, "lng": 101.62000181960445},
                  {"lat": 3.0297677644503347, "lng": 101.61980870055538},
                  {"lat": 3.0301963179410842, "lng": 101.61967995452267},
                  {"lat": 3.0307105819060256, "lng": 101.6194868354736},
                  {"lat": 3.0319319578431805, "lng": 101.61916497039181}
              ],
                strokeColor: '#ff0000',
                strokeOpacity: 1,
                strokeWeight: 6,
                icons: [{
                    offset: '0',
                    repeat: '10px'
                }],
            }}
 />
          
        </GoogleMap>
      </LoadScript>
    </div>

  );

};

export default Map;
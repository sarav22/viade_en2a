import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import { MapRouteName, Button, Input } from "./map.style";
import { LoadScript, GoogleMap, Polyline } from "@react-google-maps/api";
import { Modal } from 'react-bootstrap';
import {share } from '../../../services/sharing';

/**
 * Map Page UI component, containing the styled components for the Map Page
 * @param props
 */
const Map = props => {
  const { route, webId, routeUrl} = props;
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [agent, setAgent] = useState("");

  const routePath = [];
  route.itinerary.forEach(trackPoint => {
    routePath.push({
      lat: trackPoint.latitude,
      lng: trackPoint.longitude
    });
  });

  
 const show = () => {
   setShowModal(true);
  };

  const close = () => {
    setShowModal(false);
  };

  const shareWith = () => { 
    share(webId, routeUrl, agent);
    close();
  };

  function handleInputChange(event){
    event.preventDefault();
    setAgent(event.target.value);
  };


  return (
    <div>
      <h3>
        {t("mapView.viewTitle")} <MapRouteName>{route.name}</MapRouteName>
      </h3>

      <LoadScript id="script-loader" googleMapsApiKey="">
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
      <Button variant="success" onClick={show} width='20' data-testid={"buttonShare"} key={"buttonShare"}>Share route</Button>
      <Modal show={showModal} onHide={close} centered>
        <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>Choose a friend or group to share with:
            <Input type="text" size="200" value={agent} onChange={handleInputChange} />
          </Modal.Body>
          <Modal.Footer>
             <Button variant="primary" onClick={shareWith}>
                Share
             </Button>
          </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Map;

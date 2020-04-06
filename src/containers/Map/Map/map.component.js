import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapRouteName, MapCard, Button, Input  } from "./map.style";
import { LoadScript, GoogleMap, Polyline } from "@react-google-maps/api";
import { Modal } from "react-bootstrap";
import {
  useNotification,
  NotificationTypes
} from "@inrupt/solid-react-components";
import { storageHelper, permissionHelper, notification as helperNotification } from "@utils";

/**
 * Map Page UI component, containing the styled components for the Map Page
 * @param props
 */
export const Map = props => {
  const { route, webId, routeUrl } = props;
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

  const { createNotification } = useNotification(webId);

  async function shareWith() {
    if(agent != null && agent.length!==0){
      permissionHelper.setReadPermissions(routeUrl,webId, agent);
      //Notification
      const content = {
        title: "Notification Example",
        summary: "This is a basic solid notification example.",
        actor: webId
      };
      let appPath = "";
      appPath = await storageHelper.getAppStorage(agent);
      const viadeSettings = `${appPath}settings.ttl`;

      const inboxes = await helperNotification.findUserInboxes([
        { path: agent, name: "Global" },
        { path: viadeSettings, name: "Viade" }
      ]);
      const to = helperNotification.getDefaultInbox(inboxes, "Viade", "Global");
      const license = "https://creativecommons.org/licenses/by-sa/4.0/";
      createNotification(content, to.path, NotificationTypes.ANNOUNCE, license);
      close();
    }
  }

  function handleInputChange(event) {
    event.preventDefault();
    setAgent(event.target.value);
  }

  return (
    <div>
      <h3>
        <MapRouteName>{t("mapView.viewTitle")}{route.name}</MapRouteName>
      </h3>
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
      </MapCard>
      <Button
        variant="success"
        onClick={show}
        width="20"
        data-testid={"buttonShare"}
        key={"buttonShare"}
      >
        {" "}
        {t("mapView.shareButton")}
      </Button>
      <Modal show={showModal} onHide={close} centered 
        data-testid={"modalShare"} key={"modalShare"}>
        <Modal.Header closeButton key={"closeShare"} data-testid={"closeShare"}></Modal.Header>
        <Modal.Body>
          {t("mapView.shareWith")}
          <Input
            type="text"
            size="200"
            value={agent}
            onChange={handleInputChange}
            data-testid={"inputShare"}
            key={"inputShare"}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={shareWith} 
        data-testid={"shareWith"}
        key={"shareWith"}>
            {t("mapView.share")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Map;

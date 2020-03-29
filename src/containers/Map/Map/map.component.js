import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import data from "@solid/query-ldflex";
import { namedNode } from "@rdfjs/data-model";
import { MapRouteName, Button, Input } from "./map.style";
import { LoadScript, GoogleMap, Polyline } from "@react-google-maps/api";
import { Modal } from "react-bootstrap";
import { share } from "../../../services/sharing";
import {
  useNotification,
  NotificationTypes,
  AccessControlList
} from "@inrupt/solid-react-components";
import {
  permissionHelper,
  ldflexHelper,
  storageHelper,
  notification as helperNotification,
  errorToaster
} from "@utils";

/**
 * Map Page UI component, containing the styled components for the Map Page
 * @param props
 */
const Map = props => {
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

  const { createNotification, notification, createInbox } = useNotification(
    webId
  );

  async function shareWith() {
    share(webId, routeUrl, agent);
    //Notification
    const content = "New friend added";

    let appPath = "";
    appPath = await storageHelper.getAppStorage(webId);
    const viadeSettings = `${appPath}settings.ttl`;

    const inboxes = await helperNotification.findUserInboxes([
      { path: webId, name: "Global" },
      { path: viadeSettings, name: "Viade" }
    ]);
    const to = helperNotification.getDefaultInbox(inboxes, "Viade", "Global");
    const license = "https://creativecommons.org/licenses/by-sa/4.0/";
    createNotification(content, to.path, NotificationTypes.ANNOUNCE, license);
    close();
  }

  async function initializeOrRepairGameFiles(gamePath) {
    // Set inbox path relative to the existing app's path in the pod
    const settingsFilePath = `${gamePath}settings.ttl`;
    let inboxPath = `${gamePath}inbox/`;
    let hasInboxLink = false;

    // Check if the settings file contains a link to the inbox. If so, save it as inboxPath
    const inboxLinkedPath = await ldflexHelper.getLinkedInbox(settingsFilePath);
    if (inboxLinkedPath) {
      inboxPath = inboxLinkedPath;
      hasInboxLink = true;
    }

    // First, check if we have WRITE permission for the app
    const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
      webId,
      AccessControlList.MODES.WRITE
    );
    // If so, try to create the inbox. No point in trying to create it if we don't have permissions
    if (hasWritePermission) {
      await createInbox(inboxPath, gamePath);

      // Check for CONTROL permissions to see if we can set permissions or not
      const hasControlPermissions = await permissionHelper.checkSpecificAppPermission(
        webId,
        AccessControlList.MODES.CONTROL
      );

      // If the user has Write and Control permissions, check the inbox settings
      if (hasControlPermissions) {
        // Check if the inbox permissions are set to APPEND for public, and if not fix the issue
        await permissionHelper.checkOrSetInboxAppendPermissions(
          inboxPath,
          webId
        );
      }

      if (!hasInboxLink) {
        await data[settingsFilePath].inbox.set(namedNode(inboxPath));
      }
    }
  }

  const init = async () => {
    try {
      const path = await storageHelper.getAppStorage(webId);

      // Fetch the game's path in the pod, based on user's storage settings
      await storageHelper.createInitialFiles(webId);

      if (path) {
        await initializeOrRepairGameFiles(path);
      }
    } catch (e) {
      /**
       * Check if something fails when we try to create a inbox
       * and show user a possible solution
       */
      if (e.name === "Inbox Error") {
        return errorToaster(e.message, "Error", {
          label: t("errorCreateInbox.link.label"),
          href: t("errorCreateInbox.link.href")
        });
      }

      errorToaster(e.message, "Error");
    }
  };

  function handleInputChange(event) {
    event.preventDefault();
    setAgent(event.target.value);
  }

  useEffect(() => {
    if (webId && notification.notify) init();
  }, [webId, notification.notify]);

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
      <Modal show={showModal} onHide={close} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {t("mapView.shareWith")}
          <Input
            type="text"
            size="200"
            value={agent}
            onChange={handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={shareWith}>
            {t("mapView.share")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Map;

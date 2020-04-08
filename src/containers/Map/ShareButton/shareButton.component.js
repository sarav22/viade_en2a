import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input } from "../Map/map.style";
import { Modal } from "react-bootstrap";
import {
  useNotification,
  NotificationTypes
} from "@inrupt/solid-react-components";
import { storageHelper, permissionHelper, notification as helperNotification } from "@utils";

export const ShareButton = props => {
    const { webId, routeUrl } = props;
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [agent, setAgent] = useState("");

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

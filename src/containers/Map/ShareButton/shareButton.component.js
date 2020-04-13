import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonWrapper, Input } from "../Map/map.style";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {
  useNotification,
  NotificationTypes,
} from "@inrupt/solid-react-components";
import {
  storageHelper,
  permissionHelper,
  notification as helperNotification,
} from "@utils";
import {
  retrieveAllGroups,
  parseGroup,
} from "./../../../services/groupManager";

export const ShareButton = (props) => {
  const { webId, routeUrl } = props;
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [agent, setAgent] = useState("");

  const show = () => {
    setShowModal(true);
  };

  const close = () => {
    setShowModal(false);
  };

  const showSuccessModal = () => {
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
  };

  const { createNotification } = useNotification(webId);

  async function shareWith() {
    if (agent.endsWith("me")) {
      if (agent !== undefined && agent.length !== 0) {
        permissionHelper.setReadPermissions(routeUrl, webId, agent);
        var r = routeUrl.split("/");
        //Notification
        const content = {
          title: t("mapView.notificationTitle"),
          summary:
            webId.substring(8, webId.length - 16) +
            t("mapView.notificationSummary") +
            r[r.length - 1],
          actor: webId,
        };
        let appPath = "";
        appPath = await storageHelper.getAppStorage(agent);
        const viadeSettings = `${appPath}settings.ttl`;

        const inboxes = await helperNotification.findUserInboxes([
          { path: agent, name: "Global" },
          { path: viadeSettings, name: "Viade" },
        ]);
        const to = helperNotification.getDefaultInbox(
          inboxes,
          "Viade",
          "Global"
        );
        const license = "https://creativecommons.org/licenses/by-sa/4.0/";
        createNotification(
          content,
          to.path,
          NotificationTypes.ANNOUNCE,
          license
        );
        close();
        showSuccessModal();
      }
    } else {
      parseGroup(agent).then(function(result) {
        result.forEach((url) => {
          setAgent(url);
          shareWith();
        });
      });
    }
  }

  function handleInputChange(event) {
    event.preventDefault();
    setAgent(event.target.value);
  }

  return (
    <div>
      <ButtonWrapper>
        <Button
          variant="success"
          onClick={show}
          data-testid={"buttonShare"}
          key={"buttonShare"}
        >
          {t("mapView.shareButton")}
        </Button>
      </ButtonWrapper>
      <Modal
        show={showModal}
        onHide={close}
        centered
        data-testid={"modalShare"}
        key={"modalShare"}
      >
        <Modal.Header
          closeButton
          key={"closeShare"}
          data-testid={"closeShare"}
        ></Modal.Header>
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
          <Button
            variant="primary"
            onClick={shareWith}
            data-testid={"shareWith"}
            key={"shareWith"}
          >
            {t("mapView.share")}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showSuccess}
        onHide={closeSuccess}
        centered
        data-testid={"modalSuccess"}
        key={"modalSuccess"}
      >
        <Modal.Header
          closeButton
          key={"closeSuccess"}
          data-testid={"closeSuccess"}
        ></Modal.Header>
        <Modal.Body>{t("mapView.shareSuccess")}</Modal.Body>
      </Modal>
    </div>
  );
};

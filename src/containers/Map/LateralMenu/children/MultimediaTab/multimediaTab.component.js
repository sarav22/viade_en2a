import React, { useState, Fragment } from "react";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import LateralMenu from "./LateralMenu/lateralMenu.component";
import VinculationForm from "./VinculationForm/vinculationForm.component";
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";
import { useTranslation } from "react-i18next";
import { MediaListWrapper } from "./multimediaTab.style";
import { isRouteOwner } from "../../../../../services/PODExtractor";

const MultimediaTab = (props) => {
  const { t } = useTranslation();
  const { routeObject } = props;
  const [isOwner, setIsOwner] = useState(false);

  const userPanel = () => {
    return (
      <Container>
        <Row>
          <LateralMenu routeObject={routeObject} />
        </Row>

        <Row>
          <VinculationForm routeObject={routeObject} />
        </Row>
      </Container>
    );
  };

  isRouteOwner(routeObject.fileWebId).then((owns) => {
    setIsOwner(owns);
  });

  return (
    <Modal.Dialog scrollable centered style={{ "max-width": "100%" }}>
      <Modal.Body
        style={{
          "max-height": "calc(100vh - 220px)",
          "overflow-y": "auto",
          width: "100%",
          "scrollbar-width": "thin",
        }}
      >
        <Container>
          <Fragment>{isOwner ? userPanel() : null}</Fragment>
          <MediaListWrapper>
            <p className="label">{t("mapView.resources.pictures")} </p>
            {routeObject.imagesToDisplay.map((item) => {
              return (
                <Row>
                  <Col>
                    <Image
                      src={item.resourceUrl}
                      style={{
                        padding: "15px",
                        "max-width": "300px",
                        "max-height": "300px",
                      }}
                    />
                  </Col>
                </Row>
              );
            })}

            <p className="label">{t("mapView.resources.videos")} </p>
            {routeObject.videosToDisplay.map((item) => {
              return (
                <Row>
                  <Col>
                    <ReactPlayer url={item.resourceUrl} controls />
                  </Col>
                </Row>
              );
            })}
            <p className="label">{t("mapView.resources.audios")} </p>
            {routeObject.audiosToDisplay.map((item) => {
              return (
                <Row>
                  <Col>
                    <ReactAudioPlayer src={item.resourceUrl} controls />
                  </Col>
                </Row>
              );
            })}
          </MediaListWrapper>
        </Container>
      </Modal.Body>
    </Modal.Dialog>
  );
};

export default MultimediaTab;

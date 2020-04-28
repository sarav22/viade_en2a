import React from 'react';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import LateralMenu from './LateralMenu/lateralMenu.component';
import VinculationForm from './VinculationForm/vinculationForm.component'
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';
import { useTranslation } from 'react-i18next';
const MultimediaTab = props => {

    const { t } = useTranslation();
    const { routeObject } = props;


    return (
        <Modal.Dialog scrollable centered style={{ "max-width": "100%" }}>
            <Modal.Body style={{ 'max-height': 'calc(100vh - 220px)', 'overflow-y': 'auto', 'width': '100%', "scrollbar-width": "thin" }}>
                <Container>
                    <Row>
                        <LateralMenu routeObject = {routeObject}/>
                    </Row>

                    <Row>
                        <VinculationForm routeObject = {routeObject} />
                    </Row>
                    <p>{t("mapView.resources.pictures")} </p>
                    {routeObject.imagesToDisplay.map((item) => {
                        return (
                            <Row>
                                <Col>
                                    <Image src={item.resourceUrl}
                                        style={{ "padding": "15px", "max-width":"300px", "max-height":"300px" }}
                                    />
                                </Col>

                            </Row>

                        );
                    }
                    )}

                    <p>{t("mapView.resources.videos")} </p>
                    {routeObject.videosToDisplay.map((item) => {
                        return (
                            <Row>
                                <Col>
                                    <ReactPlayer url={item.resourceUrl} controls />
                                </Col>

                            </Row>

                        );
                    }
                    )}
                    <p>{t("mapView.resources.audios")} </p>
                    {routeObject.audiosToDisplay.map((item) => {
                        return (
                            <Row>
                                <Col>
                                    <ReactAudioPlayer src={item.resourceUrl} controls/>
                                </Col>

                            </Row>

                        );
                    }
                    )}

                </Container>
            </Modal.Body>
        </Modal.Dialog>
    );
};

export default MultimediaTab;

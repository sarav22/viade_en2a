import React from 'react';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';



const MultimediaTab = props => {
    const { resources } = props;

    //found code at https://stackoverflow.com/questions/48886701/how-to-add-scroll-into-react-bootstrap-modal-body
    return (
        <Modal.Dialog scrollable centered style={{ "max-width": "100%" }}>
            <Modal.Body style={{ 'max-height': 'calc(100vh - 215px)', 'overflow-y': 'auto', 'width': '100%', "scrollbar-width": "thin" }}>
                <Container>
                    {resources.map((item) => {
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
                </Container>
            </Modal.Body>
        </Modal.Dialog>
    );
};

export default MultimediaTab;

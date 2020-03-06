import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';



const DataTab = props => {
    const { route } = props;

    return (
        <Modal.Dialog scrollable centered style={{ "max-width": "100%" }}>
            <Modal.Body style={{ 'max-height': 'calc(100vh - 215px)', 'overflow-y': 'auto', 'width': '100%' }}>
                <Container>
                    <h4>{route.name}</h4>
                    <p>route.description</p>
                    <h5>Puntos de ruta</h5>
                    <ol>
                        {route.waypoints.map(point => {
                            return (
                                <li><p>name:{point.name}</p>
                                    <p>description:{point.name}</p>
                                    <p>latitude:{point.lat}</p>
                                    <p>longitude:{point.lng}</p>
                                    <p>elevation:{point.ele}</p>
                                </li>
                            );
                        }
                        )}
                    </ol>
                </Container>
            </Modal.Body>
        </Modal.Dialog>
    );
};

export default DataTab;

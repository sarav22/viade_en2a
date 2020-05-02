import React from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";

const DataTab = (props) => {
  const { route } = props;
  return (
    <Modal.Dialog scrollable centered style={{ "max-width": "100%" }} data-testid="dataTab">
      <Modal.Body
        style={{
          "max-height": "calc(100vh - 220px)",
          "overflow-y": "auto",
          width: "100%",
          "scrollbar-width": "thin",
        }}
      >
        <Container>
          <h4>{route.name}</h4>
          <p>{route.description}</p>
          <h5>Puntos de ruta</h5>
          <ol>
            {route.itinerary.map((point) => {
              return (
                <li>
                  {point.name !== null && <p>name:{point.name}</p>}
                  {point.description !== null && (
                    <p>description:{point.description}</p>
                  )}

                  <p>latitude:{point.latitude}</p>
                  <p>longitude:{point.longitude}</p>
                  {point.elevation !== null && (
                    <p>elevation:{point.elevation}</p>
                  )}
                </li>
              );
            })}
          </ol>
        </Container>
      </Modal.Body>
    </Modal.Dialog>
  );
};

export default DataTab;

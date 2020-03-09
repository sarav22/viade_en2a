import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'


const SharedRoutes = props => {
    const { webId, friendWebId } = props;
    
    return (
  
      <Container fluid>
        <h1 className="friendHeaderBar">{friendWebId}</h1>
        <p>{webId}</p>
        <Button variant="outline-primary">Ruta 1</Button>
      </Container>
  
    );
  
};

export default SharedRoutes;
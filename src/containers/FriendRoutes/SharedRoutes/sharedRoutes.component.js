import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'


const SharedRoutes = props => {
    const { routes } = props;
    
    return (
  
      <Container fluid>
        {
          routes.map(route => {
            <Button variant="outline-primary" style={{margin: '10px'}}>
              {route}
            </Button>
          })
        }
      </Container>
  
    );
  
};

export default SharedRoutes;
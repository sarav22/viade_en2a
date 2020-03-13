import React from 'react';
import Container from 'react-bootstrap/Container';
import RouteButton from './RouteButton'


const SharedRoutes = props => {
    const { routes } = props;
    
    return (
  
      <Container fluid>
        {
          routes.map(route => (
            <RouteButton {...{route}} />
          ))
        }
      </Container>
  
    );
  
};

export default SharedRoutes;
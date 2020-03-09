import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import InfiniteList from "@components/InfiniteList";


const SharedRoutes = props => {
    const { webId, friendWebId } = props;
    
    return (
  
      <Container fluid>
        <InfiniteList />
      </Container>
  
    );
  
};

export default SharedRoutes;
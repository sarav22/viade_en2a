import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import BackButton from "./children/BackButton";
import FriendDropdown from "./children/FriendDropdown";

const FriendBar = props => {
    const { friendWebId } = props;
    
    return (

      <Container fluid>
        <Row lg={true} >
          <Col md="auto">
            <BackButton />
          </Col>
          <Col md="auto">
          <Card body>THIS IS A TEST</Card>
          </Col>
          <Col md="auto">
            <FriendDropdown {...{friendWebId}}/>
          </Col>
        </Row>
      </Container>
  
    );
  
};

export default FriendBar;
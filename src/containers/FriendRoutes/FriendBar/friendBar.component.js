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
        <Row lg="true" >
          <Col align="right">
            <BackButton />
          </Col>
          <Col xs={6}>
            <Card style={{ height: '25%'}} body text="primary">
              {friendWebId}
            </Card>
          </Col>
          <Col>
            <FriendDropdown {...{friendWebId}}/>
          </Col>
        </Row>
      </Container>
  
    );
  
};

export default FriendBar;
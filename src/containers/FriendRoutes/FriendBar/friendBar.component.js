import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import BackButton from "./children/BackButton";
import FriendDropdown from "./children/FriendDropdown";

const FriendBar = props => {
    const { webId, friendWebId } = props;
    const friendName = friendWebId.toString().substring(8).split(".")[0];
    return (

      <Container fluid>
        <Row>
          <Col align="right">
            <BackButton />
          </Col>
          <Col xs={6}>
            <Card style={{ height: '65%'}} text="primary" data-testid="friendBarName">
              {friendName}
            </Card>
          </Col>
          <Col>
            <FriendDropdown {...{webId, friendWebId}}/>
          </Col>
        </Row>
      </Container>
  
    );
  
};

export default FriendBar;
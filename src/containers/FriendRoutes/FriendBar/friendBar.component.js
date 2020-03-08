import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import BackButton from "./children/BackButton";
import FriendDropdown from "./children/FriendDropdown";
import ldflex from '@solid/query-ldflex';

const FriendBar = props => {
    const { webId } = props;

    async function logEmail(webId){
      const me = ldflex[webId];
      console.log(await `${me.name}`);
    }
    
    logEmail(webId);

    return (

      <Container fluid>
        <Row>
          <Col align="right">
            <BackButton />
          </Col>
          <Col xs={6}>
            <Card style={{ height: '65%'}} text="primary">
              {webId}
            </Card>
          </Col>
          <Col>
            <FriendDropdown {...{webId}}/>
          </Col>
        </Row>
      </Container>
  
    );
  
};

export default FriendBar;
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import BackButton from "./children/BackButton";
import FriendDropdown from "./children/FriendDropdown";
import { fetchDocument } from 'tripledoc';
import { foaf } from 'rdf-namespaces';

async function getName(webId) {
  /* 1. Fetch the Document at `webId`: */
  const webIdDoc = await fetchDocument(webId);
  /* 2. Read the Subject representing the current user's profile: */
  const profile = webIdDoc.getSubject(webId);
  /* 3. Get their foaf:name: */
  return profile.getString(foaf.name);
}

const FriendBar = props => {
    const { webId } = props;

    const name = getName(webId);
    const newName = name.then(console.log);

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
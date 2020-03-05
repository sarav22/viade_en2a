import React, { Component } from 'react';
import Map  from './Map';
import LateralMenu from './LateralMenu';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
export class MapComponent extends Component<Props> {


  constructor(props) {
    super(props);

    this.state = {
      name: "routeName",
    };

  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }


  render() {
    const { name } = this.state;
    const { webId } = this.props.webId;
    
    return (
      <Container fluid >  
        <Row>

          <Col xs={6} md={4}>
            <LateralMenu/>
          </Col>

          <Col xs={12} md={8}>
            <Map {...{ name, webId, }} />
          </Col>

        </Row>

      </Container>
    );
  }
}

import React, { Component } from 'react';
import Map from './Map';
import LateralMenu from './LateralMenu';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
export class MapComponent extends Component<Props> {


  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }


  render() {
    const { webId } = this.props.webId;
    const route = {
      name: "nombre de la ruta",
      description: "una descripcion sobre la ruta",
      waypoints: [

        { "name":"point 1",
          "description":"a brief description",
          "lat": 3.028846373870724, 
          "lng": 101.62019493865353,
          "ele": 200
        },
        { "name":"point 1",
          "description":"a brief description",
          "lat": 3.0293392107899226, 
          "lng": 101.0297677644503347,
          "ele": 200
        },
        { "name":"point 1",
          "description":"a brief description",
          "lat": 3.61980870055538, 
          "lng": 101.61980870055538,
          "ele": 200
        },
        { "name":"point 1",
          "description":"a brief description",
          "lat": 3.61967995452267, 
          "lng": 101.0301963179410842,
          "ele": 200
        },
        { "name":"point 1",
          "description":"a brief description",
          "lat": 3.0307105819060256, 
          "lng": 101.6194868354736,
          "ele": 200
        },
        { "name":"point 1",
          "description":"a brief description",
          "lat": 3.0319319578431805, 
          "lng": 101.61916497039181,
          "ele": 200
        }
      ],
      comments: [
        {
          "author": "el autor",
          "time": "27-01-2020 14:45PM",
          "text": "esto es un comentario de prueba"
        },
        {
          "author": "el autor",
          "time": "27-01-2020 14:45PM",
          "text": "esto es un comentario de prueba"
        },
        {
          "author": "el autor",
          "time": "27-01-2020 14:45PM",
          "text": "esto es un comentario de prueba"
        },
        {
          "author": "el autor",
          "time": "27-01-2020 14:45PM",
          "text": "esto es un comentario de prueba"
        },
        {
          "author": "el autor",
          "time": "27-01-2020 14:45PM",
          "text": "esto es un comentario de prueba"
        }
      ],
      multimedia: [
        {
          "url": "https://picsum.photos/id/2/200/200",
          "time": "27-01-2020 14:45PM",
          "author": "el autor"
        },
        {
          "url": "https://picsum.photos/id/2/200/200",
          "time": "27-01-2020 14:45PM",
          "author": "el autor"
        },
        {
          "url": "https://picsum.photos/id/2/200/200",
          "time": "27-01-2020 14:45PM",
          "author": "el autor"
        },
        {
          "url": "https://picsum.photos/id/2/200/200",
          "time": "27-01-2020 14:45PM",
          "author": "el autor"
        },
        {
          "url": "https://picsum.photos/id/2/200/200",
          "time": "27-01-2020 14:45PM",
          "author": "el autor"
        }
      ]
    };

    return (
      <Container fluid >
        <Row>

          <Col xs={6} md={4}>
            <LateralMenu route={route} />
          </Col>

          <Col xs={12} md={8}>
            <Map {...{ route, webId, }} />
          </Col>

        </Row>

      </Container>
    );
  }
}

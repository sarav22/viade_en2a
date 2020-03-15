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
        {
          "lng":-5.660362243652343,
          "lat":43.54151805034638
        },
        {
          "lng":-5.658988952636719,
          "lat":43.53747383877038
        },
        {
          "lng":-5.652294158935547,
          "lat":43.53747383877038
        },
        {
          "lng":-5.649118423461914,
          "lat":43.53722495535158
        },
        {
          "lng":-5.646543502807617,
          "lat":43.536104967254566
        },
        {
          "lng":-5.64448356628418,
          "lat":43.534487169945024
        },
        {
          "lng":-5.644569396972656,
          "lat":43.53311823062938
        },
        {
          "lng":-5.64448356628418,
          "lat":43.53156258005077
        },
        {
          "lng":-5.644311904907226,
          "lat":43.53087808108379
        },
        {
          "lng":-5.643625259399414,
          "lat":43.529135685021664
        },
        {
          "lng":-5.6413936614990225,
          "lat":43.5254018096767
        },
        {
          "lng":-5.639419555664062,
          "lat":43.524592772887466
        },
        {
          "lng":-5.637445449829101,
          "lat":43.52216559741784
        },
        {
          "lng":-5.638904571533202,
          "lat":43.5219788875677
        },
        {
          "lng":-5.646114349365234,
          "lat":43.521294279840234
        },
        {
          "lng":-5.6517791748046875,
          "lat":43.52023623443569
        },
        {
          "lng":-5.655384063720703,
          "lat":43.51787112467502
        },
        {
          "lng":-5.6586456298828125,
          "lat":43.51525694813222
        },
        {
          "lng":-5.663366317749023,
          "lat":43.51401206235411
        },
        {
          "lng":-5.669031143188477,
          "lat":43.51301613524149
        },
        {
          "lng":-5.674095153808594,
          "lat":43.512891643196774
        },
        {
          "lng":-5.679588317871094,
          "lat":43.51276715089525
        },
        {
          "lng":-5.684480667114258,
          "lat":43.51394981739109
        },
        {
          "lng":-5.685596466064453,
          "lat":43.515568165564105
        },
        {
          "lng":-5.686197280883788,
          "lat":43.51594162436369
        },
        {
          "lng":-5.687227249145508,
          "lat":43.51544367878394
        },
        {
          "lng":-5.6861114501953125,
          "lat":43.5131406270294
        },
        {
          "lng":-5.68714141845703,
          "lat":43.51164670862528
        },
        {
          "lng":-5.689029693603516,
          "lat":43.5107129908437
        },
        {
          "lng":-5.691862106323242,
          "lat":43.50915676244034
        },
        {
          "lng":-5.696239471435547,
          "lat":43.50753824233534
        },
        {
          "lng":-5.705080032348633,
          "lat":43.49975628978046
        },
        {
          "lng":-5.711688995361328,
          "lat":43.49689227873986
        },
        {
          "lng":-5.71563720703125,
          "lat":43.49552248630757
        },
        {
          "lng":-5.7176971435546875,
          "lat":43.49433945874659
        },
        {
          "lng":-5.7190704345703125,
          "lat":43.49296960840617
        },
        {
          "lng":-5.719156265258789,
          "lat":43.49247147330571
        },
        {
          "lng":-5.718727111816406,
          "lat":43.491537458917975
        },
        {
          "lng":-5.717954635620117,
          "lat":43.49054116098296
        },
        {
          "lng":-5.716753005981445,
          "lat":43.48973165680919
        },
        {
          "lng":-5.715894699096679,
          "lat":43.488797600050006
        },
        {
          "lng":-5.716753005981445,
          "lat":43.488423973301785
        },
        {
          "lng":-5.723276138305664,
          "lat":43.487303079190156
        },
        {
          "lng":-5.732889175415039,
          "lat":43.488548515807985
        },
        {
          "lng":-5.734519958496094,
          "lat":43.4886730580574
        },
        {
          "lng":-5.74336051940918,
          "lat":43.483815720045435
        },
        {
          "lng":-5.746107101440429,
          "lat":43.482881571803105
        },
        {
          "lng":-5.747823715209961,
          "lat":43.482881571803105
        },
        {
          "lng":-5.750312805175781,
          "lat":43.47995448044043
        },
        {
          "lng":-5.75408935546875,
          "lat":43.478459740792616
        },
        {
          "lng":-5.759239196777344,
          "lat":43.476778114488646
        },
        {
          "lng":-5.761556625366211,
          "lat":43.47409987227625
        },
        {
          "lng":-5.761728286743163,
          "lat":43.47173295477737
        },
        {
          "lng":-5.759925842285156,
          "lat":43.46737260093111
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

import React, { Component, Fragment } from "react";
import Map from "./Map";
import LateralMenu from "./LateralMenu";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { loadMapInfo } from "../../services/DomainJSONTranslator";
import { Base64 } from "js-base64";
import { MapWrapper } from "./Map/map.style";
import { LateralMenuWrapper } from "./LateralMenu/lateralMenu.style";

/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
export class MapComponent extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      route: "https://" + Base64.decode(this.props.match.params.route),
      title: null
    };
  }

  componentDidMount() {
    loadMapInfo(this.state.route).then(ruta => {
      this.setState({ loading: false, route: ruta });
    });
    //const route = null;
    //loadMapInfo("https://luispresacollada.solid.community/viade/routes/route.txt").then(function (result){const route = result;console.log(route)})
    //console.log("log2"+ route)
  }

  componentDidUpdate(prevProps) {}

  viewContent = route => {
    return (
      <MapWrapper>
        <Container fluid>
          <Row>
            <Col xs={6} md={4}>
              <LateralMenuWrapper>
                <LateralMenu route={route} />
              </LateralMenuWrapper>
            </Col>

            <Col xs={12} md={8}>
              <Map route={route} />
            </Col>
          </Row>
        </Container>
      </MapWrapper>
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <Fragment>
        {loading ? "Loading..." : this.viewContent(this.state.route)}
      </Fragment>
    );
  }
}

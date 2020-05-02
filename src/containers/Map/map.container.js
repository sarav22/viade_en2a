import React, { Component, Fragment } from "react";
import Map from "./Map";
import LateralMenu from "./LateralMenu";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Loader } from '@util-components';
import { loadMapInfo } from "../../services/DomainJSONTranslator";
import { Base64 } from "js-base64";
import { MapWrapper } from "./Map/map.style";
import { LateralMenuWrapper } from "./LateralMenu/lateralMenu.style";
import ShareButton from "./ShareButton";
import {foaf} from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';
import data from '@solid/query-ldflex';

/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
export class MapComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      route: "https://" + Base64.decode(this.props.match.params.route),
      title: null,
      friends: null,
      images: []
    };
  }

  componentDidMount() {
    loadMapInfo(this.state.route).then(ruta => {
      this.setState({ loading: false, route: ruta });
    });
    this.loadFriends();
  
    //const route = null;
    //loadMapInfo("https://luispresacollada.solid.community/viade/routes/route.txt").then(function (result){const route = result;console.log(route)})
    //console.log("log2"+ route)
  }

   async loadFriends() {
     const profileDoc =  await fetchDocument(this.props.webId);
     const profile = profileDoc.getSubject(this.props.webId);
     const fs=profile.getAllRefs(foaf.knows);
     this.setState({friends: fs});
     await this.loadImage(this.state.friends)
  }

  async loadImage(friends){
    friends.forEach(friendWebId=> {
      const user = data[friendWebId];
      const i = user.vcard_hasPhoto;
      i.then(response=>
        {
        if(response && response.value){
          let array = this.state.images;
          array.push({id: friendWebId, img:response.value});
          this.setState({images:array});
        }else{
          let array = this.state.images;
          array.push({id: friendWebId, img:"img/icon/empty-profile.svg"});
          this.setState({images:array});
        }})
      
    })
  }


  componentDidUpdate(prevProps) {}

  viewContent = route => {
    return (
      <MapWrapper>
        <Container fluid>
          <Row>
            <Col xs={12} md={7} sm={8}>
              <Map route={route} />
            </Col>
            <Col xs={12} md={5} sm={4}>
              <Container fluid>
                <Row>
                  <LateralMenuWrapper>
                    <LateralMenu route={route} />
                  </LateralMenuWrapper>
                </Row>
                <Row>
                  <ShareButton webId={this.props.webId} routeUrl={"https://" + Base64.decode(this.props.match.params.route)} friends={this.state.friends} images={this.state.images}/>
                </Row>
              </Container>
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
        {loading ? 	<Loader /> : this.viewContent(this.state.route)}
      </Fragment>
    );
  }
}

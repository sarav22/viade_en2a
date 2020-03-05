import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const LateralMenu = ({ webId }) => {

    const { t } = useTranslation();


    return(
      <Tabs id="controlled-tab-example" >
      <Tab eventKey="home" title={t('mapView.menu.images')}>
        adsfasfsdfasdfafdadsf
      </Tab>
      <Tab eventKey="profile" title={t('mapView.menu.comments')}>
        asfdadfsasdfafd
      </Tab>
      <Tab eventKey="contact" title={t('mapView.menu.data')} > 
        asdfdfafasfasdfasdfasdfasdf
      </Tab>
    </Tabs>
/*
        <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link >{t('mapView.menu.images')}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">  {t('mapView.menu.comments')}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">  {t('mapView.menu.data')}</Nav.Link>
        </Nav.Item>
      </Nav>*/
    );
  
};
export default LateralMenu;

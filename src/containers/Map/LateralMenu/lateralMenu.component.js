import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import Nav from 'react-bootstrap/Nav';


const GameListPage = ({ webId }) => {

    const { t } = useTranslation();


    return(
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
      </Nav>
    );
  
};
export default GameListPage;

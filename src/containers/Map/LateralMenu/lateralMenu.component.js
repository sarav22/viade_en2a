import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MultimediaTab from './children/MultimediaTab';
import CommentsTab from './children/CommentsTab';
import DataTab from './children/DataTab';

const LateralMenu = ({ webId }) => {

  const { t } = useTranslation();
  const comments = [
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
  ];

  const multimedia = [
    {
      "url":"https://picsum.photos/id/2/200/200",
      "time": "27-01-2020 14:45PM",
      "author": "el autor"
    },
    {
      "url":"https://picsum.photos/id/2/200/200",
      "time": "27-01-2020 14:45PM",
      "author": "el autor"
    },
    {
      "url":"https://picsum.photos/id/2/200/200",
      "time": "27-01-2020 14:45PM",
      "author": "el autor"
    },
    {
      "url":"https://picsum.photos/id/2/200/200",
      "time": "27-01-2020 14:45PM",
      "author": "el autor"
    },
    {
      "url":"https://picsum.photos/id/2/200/200",
      "time": "27-01-2020 14:45PM",
      "author": "el autor"
    }
  ];

  return (
    <Tabs id="controlled-tab-example" >
      <Tab eventKey="home" title={t('mapView.menu.images')}>
        <MultimediaTab multimedia={multimedia}/>
      </Tab>
      <Tab eventKey="profile" title={t('mapView.menu.comments')}>
        <CommentsTab comments={comments} />
      </Tab>
      <Tab eventKey="contact" title={t('mapView.menu.data')} >
        <DataTab />
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

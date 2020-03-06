import React from 'react';
import { useTranslation } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MultimediaTab from './children/MultimediaTab';
import CommentsTab from './children/CommentsTab';
import DataTab from './children/DataTab';

const LateralMenu = props  => {

  const { t } = useTranslation();
  const { route } = props;

  return (
    <Tabs id="controlled-tab-example" >
      <Tab eventKey="home" title={t('mapView.menu.images')}>
        <MultimediaTab multimedia={route.multimedia}/>
      </Tab>
      <Tab eventKey="profile" title={t('mapView.menu.comments')}>
        <CommentsTab comments={route.comments} />
      </Tab>
      <Tab eventKey="contact" title={t('mapView.menu.data')} >
        <DataTab route={route}/>
      </Tab>
    </Tabs>
  );

};
export default LateralMenu;

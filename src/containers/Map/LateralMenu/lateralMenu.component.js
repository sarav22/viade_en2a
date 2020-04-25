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
      <Tabs id="controlled-tab-example" data-testid={"tabs"} >
        <Tab data-testid={"multimediaTab"} eventKey="multimedia" title={t('mapView.menu.images')}>
        <MultimediaTab resources={route.resources}/>
      </Tab>
        <Tab data-testid={"commentsTab"} eventKey="comments" title={t('mapView.menu.comments')}>
        <CommentsTab routeObject={route} />
      </Tab>
        <Tab data-testid={"dataTab"} eventKey="data" title={t('mapView.menu.data')} >
          <DataTab route={route}/>
        </Tab>
      </Tabs>
  );

};
export default LateralMenu;

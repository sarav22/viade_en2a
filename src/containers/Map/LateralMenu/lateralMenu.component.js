import React from "react";
import { useTranslation } from "react-i18next";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MultimediaTab from "./children/MultimediaTab";
import CommentsTab from "./children/CommentsTab";
import DataTab from "./children/DataTab";

const LateralMenu = (props) => {
  const { t } = useTranslation();
  const { route } = props;
  return (
    <Tabs id="controlled-tab-example">
      <Tab eventKey="multimedia" title={t("mapView.menu.images")}>
        <MultimediaTab routeObject={route} />
      </Tab>
      <Tab eventKey="comments" title={t("mapView.menu.comments")}>
        <CommentsTab routeObject={route} />
      </Tab>
      <Tab eventKey="data" title={t("mapView.menu.data")}>
        <DataTab route={route} />
      </Tab>
    </Tabs>
  );
};
export default LateralMenu;

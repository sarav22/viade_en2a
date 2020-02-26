import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
    MapWrapper,
    MapRouteName
} from './map.style';

/**
 * Map Page UI component, containing the styled components for the Map Page
 * @param props
 */
export const MapPageContent = props => {
    const { webId, name} = props;
    const { t } = useTranslation();

    return(
        <MapWrapper data-testid="map-wrapper">
          <h3>
            {t('map.view')}, <MapRouteName>{name}</MapRouteName>
          </h3>

        </MapWrapper>


    );

};

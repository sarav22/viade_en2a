import React from 'react';
import { render, cleanup, fireEvent} from 'react-testing-library';
import { ShareButton } from '@containers/Map/ShareButton/shareButton.component';
import '@testing-library/jest-dom/';

const webId =  "https://podejemplo2.inrupt.net/profile/card#me";
const routeUrl =  "https://podejemplo2.inrupt.net/viade/routes/ruta.txt";
const friends =["https://raulpemol.inrupt.net/profile/card#me", "https://carlosmanrique.inrupt.net/profile/card#me"];
const images =["img/icon/empty-profile.svg", "img/icon/empty-profile.svg"];


afterAll(cleanup);
    const { container, getByTestId } = render(
    <ShareButton {...{webId, routeUrl, friends, images}} />
    
);

test('Renders correctly', () => {
    expect(container).toBeTruthy();
});

test('Renders share button', () => {
        expect(getByTestId('buttonShare')).toBeTruthy();
});

test('Modal works', () => {
    
    getByTestId('buttonShare').click();
    expect(getByTestId('modalShare')).toBeTruthy();
    getByTestId('closeShare').click();
    fireEvent.input(getByTestId('inputShare'), 'https://raulpemol.inrupt.net/profile/card#me' );
    getByTestId('shareWith').click(); 
    
});


import React from 'react';
import { render, cleanup, wait } from 'react-testing-library';
import FriendBar from "@containers/FriendRoutes/FriendBar/friendBar.component";
import '@testing-library/jest-dom/';

const webId =  "https://raulpemol.inrupt.net/profile/card#me";
const friendWebId ="https://luispresacollada.solid.community/profile/card#me";

afterAll(cleanup);

const { container, getByTestId } = render(
    <FriendBar {...{webId, friendWebId}} />
);

test('Renders component', () => {
    expect(container).toBeTruthy();
    expect(getByTestId('friendBar-component')).toBeTruthy();
    //The timeout is neccesary in order to let the app load the data from the POD
    setTimeout(() => { 
        expect(getByTestId('friendBarName').textContent).toBe('Luis Presa Collada'); 
    }, 5000);
});

test('Renders back button', () =>{
    expect(getByTestId('friend-backButton')).toBeTruthy();
});

test('Renders dropdown', () =>{
    expect(getByTestId('friend-dropdown')).toBeTruthy();
});
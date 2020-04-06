import React from 'react';
import {  cleanup } from 'react-testing-library';
import { ManageFriendsContent } from '@containers/ManageFriends/manageFriends.component';
import { ManageFriendsContainer } from '@containers/ManageFriends/manageFriends.container';
import '@testing-library/jest-dom/';

const webId =  "https://saravg.inrupt.net/profile/card#me";
const friends =["https://raulpemol.inrupt.net/profile/card#me", "https://carlosmanrique.inrupt.net/profile/card#me"];

afterAll(cleanup);
    const { container, getByTestId } = ManageFriendsContainer.render(
    <ManageFriendsContent {...{webId, friends}} />
);

test('Renders correctly', () => {
    expect(container).toBeTruthy();
    expect(getByTestId('manageFriends-container')).toBeTruthy();
});

test('Renders friends buttons correctly', () =>{
    friends.map(friend=>(
        expect(getByTestId('buttonFriend'+friend)).toBeTruthy()));
});
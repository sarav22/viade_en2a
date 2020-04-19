import React from 'react';
import { render, cleanup} from 'react-testing-library';
import { ManageFriendsContent } from '@containers/ManageFriends/manageFriends.component';
import '@testing-library/jest-dom/';

const webId =  "https://saravg.inrupt.net/profile/card#me";
const friends =["https://raulpemol.inrupt.net/profile/card#me", "https://carlosmanrique.inrupt.net/profile/card#me"];
const images =["img/icon/empty-profile.svg", "img/icon/empty-profile.svg"];

afterAll(cleanup);
    const { container, getByTestId } = render(
    <ManageFriendsContent {...{webId, friends, images}} />
);

test('Renders correctly', () => {
    expect(container).toBeTruthy();
    expect(getByTestId('manageFriends-container')).toBeTruthy();
});

test('Renders friends buttons correctly', () => {
    friends.map(friend => (
        expect(getByTestId('buttonFriend'+friend)).toBeTruthy()));
});

test('Dropdown works', () => {
    friends.map(friend=>(
        expect(getByTestId(friend+'d')).toBeTruthy()));
});
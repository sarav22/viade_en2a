import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { FriendRoutesComponent } from '@containers/FriendRoutes/friendRoutes.container';
import FriendBar from '@containers/FriendRoutes/FriendBar';
import '@testing-library/jest-dom/';

const webId = "https://raulpemol.solid.community/profile/card#me";
const friendWebId = "https://saravg.inrupt.net/profile/card#me";

afterAll(cleanup);
    const { container, getByTestId } = render(
    <FriendRoutesComponent {...{webId, friendWebId}} />
);

test('Renders without crashing', () => {
    expect(container).toBeTruthy();
});

test('Renders with styled components', () => {
    expect(getByTestId('friendBar-wrapper')).toBeTruthy();
});

test('Friend bar renders correctly', () =>{
    const { getByTestId } = render(<FriendBar {...{webId, friendWebId}} />);
    expect(getByTestId('friendBarName')).toBeTruthy();
    expect(getByTestId('friend-dropdown')).toBeTruthy();
    expect(getByTestId('friend-backButton')).toBeTruthy();
});
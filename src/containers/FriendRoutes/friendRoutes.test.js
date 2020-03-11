import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { FriendRoutesComponent } from './friendRoutes.container';
import FriendBar from './FriendBar';

const testWebId = "https://raulpemol.solid.community/profile/card#me";
const testFriendId = "https://agm.solid.community/profile/card#me";

afterAll(cleanup);
    const { container, getByTestId } = render(
    <FriendRoutesComponent {...{testWebId, testFriendId}} />
);

test('Renders without crashing', () => {
    expect(container).toBeTruthy();
});

test('Renders with styled components', () => {
    expect(getByTestId('friendBar-wrapper')).toBeTruthy();
});

test('Friend bar renders correctly', () =>{
    const { getByTestId } = render(<FriendBar {...{testWebId, testFriendId}} />);
    expect(getByTestId('friendBarName')).toBeTruthy();
    expect(getByTestId('friend-dropdown')).toBeTruthy();
    expect(getByTestId('friend-backButton')).toBeTruthy();
});
import React from 'react';
import { render, cleanup} from 'react-testing-library';
import AddFriendsContent from '@containers/ManageFriends/addFriend.component';
import '@testing-library/jest-dom/';

const webId =  "https://mariaflorez.solid.community/profile/card#me";

afterAll(cleanup);
    const { container, getByTestId } = render(
        <AddFriendsContent webId={webId}/>
);

test('Renders correctly', () => {
    expect(container).toBeTruthy();
    expect(getByTestId('addFriendForm')).toBeTruthy();
});

test('Renders button correctly', () => {
    expect(getByTestId('addFriendButton')).toBeTruthy();
});

test('Renders label correctly', () => {
    expect(getByTestId('addFriendLabel')).toBeTruthy();
});

test('Renders input field correctly', () => {
    expect(getByTestId('webIdFriend')).toBeTruthy();
});


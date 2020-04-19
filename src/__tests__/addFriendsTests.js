import React from 'react';
import { render, cleanup} from 'react-testing-library';
import AddFriendsContent from '@containers/ManageFriends/addFriend.component';
import '@testing-library/jest-dom/';
import { ManageFriendsComponent } from '../containers/ManageFriends/manageFriends.container';

const webId =  "https://mariaflorez.solid.community/profile/card#me";
var friends =["https://raulpemol.inrupt.net/profile/card#me", "https://carlosmanrique.inrupt.net/profile/card#me"];

afterAll(cleanup);
    const { container, getByTestId } = render(
        <AddFriendsContent webId={webId}/>
);

test('Renders correctly', () => {
    expect(container).toBeTruthy();
    expect(getByTestId('addFriendForm')).toBeTruthy();
});
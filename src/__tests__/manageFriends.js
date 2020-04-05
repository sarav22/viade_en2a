import React from 'react';
import { render, cleanup} from 'react-testing-library';
import { ManageFriendsContent } from '@containers/ManageFriends/manageFriends.component';
import '@testing-library/jest-dom/';

const webId =  "https://saravg.inrupt.net/profile/card#me";
const friends =["https://raulpemol.inrupt.net/profile/card#me", "https://carlosmanrique.inrupt.net/profile/card#me"];

afterAll(cleanup);
    const { container, getByTestId } = render(
    <ManageFriendsContent {...{webId, friends}} />
);

test('Renders correctly', () => {
    expect(container).toBeTruthy();
    expect(getByTestId('manageFriends-wrapper')).toBeTruthy();
});

test('Renders friends buttons correctly', () =>{
    friends.map(friend=>(
        expect(getByTestId('buttonFriend'+friend)).toBeTruthy()));
});

test('Dropdown works', () =>{
    friends.map(friend=>(
        expect(getByTestId(friend+'dropdown')).toBeTruthy()
    ));
    friends.map(friend=>(
        expect(getByTestId(friend+'d')).toBeTruthy()));
   
    getByTestId('https://carlosmanrique.inrupt.net/profile/card#medropdown').click();
  //should work
  //expect(getByTestId('https://carlosmanrique.inrupt.net/profile/card#medropdownI1')).toBeTruthy();
          
          
});
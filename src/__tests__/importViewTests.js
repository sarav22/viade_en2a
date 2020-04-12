import React from 'react';
import { render, cleanup} from 'react-testing-library';
import { ImportRoute } from '@containers/ImportRoute/importRoute.container.js';
import '@testing-library/jest-dom/';

afterAll(cleanup);

const { container, getByTestId } = render(
    <ImportRoute />
);

test('Renders correctly', () => {
    expect(container).toBeTruthy();
    expect(getByTestId('dropMenu')).toBeTruthy();
})

//test('Renders component', () => {
  //  expect(container).toBeTruthy();
    //expect(getByTestId('friendBar-component')).toBeTruthy();
    //The timeout is neccesary in order to let the app load the data from the POD
    //setTimeout(() => { 
    //    expect(getByTestId('friendBarName').textContent).toBe('Luis Presa Collada'); 
    //}, 5000);
//});

//test('Renders back button', () =>{
 //   expect(getByTestId('friend-backButton')).toBeTruthy();
//});

//test('Renders dropdown', () =>{
 //   expect(getByTestId('friend-dropdown')).toBeTruthy();
//});
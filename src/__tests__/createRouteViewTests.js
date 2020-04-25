import React from 'react';
import { render, cleanup, fireEvent} from 'react-testing-library';
import { CreateRoute } from '@containers/CreateRoute/createRoute.container.js';

import '@testing-library/jest-dom/';


const base64Route = ""
afterAll(cleanup);
    const { container, getByTestId } = render(
    <CreateRoute  />
    
);

test('Renders correctly', () => {
    expect(container).toBeTruthy();
});

test('Renders map', () => {
        expect(getByTestId('map')).toBeTruthy();
});

test('Renders form', () => {
    expect(getByTestId('lateralForm')).toBeTruthy();
});

test('Renders form', () => {
    expect(getByTestId('formName')).toBeTruthy();
});

test('Renders form', () => {
    expect(getByTestId('formSurname')).toBeTruthy();
});

test('Renders form', () => {
    expect(getByTestId('submitButton')).toBeTruthy();
});


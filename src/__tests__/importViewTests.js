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
});
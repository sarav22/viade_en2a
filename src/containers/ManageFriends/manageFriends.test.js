import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ManageFriendsComponent } from './welcome.container';

library.add(fas);


describe.only('ManageFriends', () => {
  afterAll(cleanup);
  const { container, getByTestId } = render(
    <Router>
      <ManageFriendsComponent {...{}} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('renders with styled components', () => {
    expect(getByTestId('manageFriends-wrapper')).toBeTruthy();
  });
});

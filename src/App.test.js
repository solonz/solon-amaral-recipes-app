import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './tests/helpers/renderWithRouter';
import App from './App';

test('Farewell, front-end', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});

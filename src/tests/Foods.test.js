import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import Foods from '../Pages/Foods';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Foods page', () => {
    test('if inputs are rendered', () => {
        renderWithRouter(<Foods />);
        const h1 = screen.getByText('teste')
        expect(h1).toBeInTheDocument();
    });
})
import Login from '../Pages/Login';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Provider from '../context/Provider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Login page', () => {
    test('if inputs are rendered', () => {
        renderWithRouter((<Provider><Login /></Provider>));
        const emailInput = screen.getByTestId("email-input");
        expect(emailInput).toBeInTheDocument();
        const passInput = screen.getByTestId("password-input");
        expect(passInput).toBeInTheDocument();
    });
    test('user events', async () => {
        const { history } = renderWithRouter(<Provider><Login /></Provider>);
        const emailInput = await screen.findByTestId("email-input");
        userEvent.type(emailInput, 'aaaa@aaaa.com')
        const passInput = await screen.findByTestId("password-input");
        userEvent.type(passInput, '1234567') 
        const loginButton = await screen.findByTestId("login-submit-btn");
        history.push('/foods')
        userEvent.click(loginButton)
        const rota = history.location.pathname;
        expect(rota).toBe('/foods')
        });
})
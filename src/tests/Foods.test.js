import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';
import data from './helpers/mockData';

const chamadaAPI = () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(data),
  });
};

describe('teste o componente Foods', () => {
  beforeEach(chamadaAPI)
  afterEach(() => jest.clearAllMocks());
    test('Testa se a API é chamada corretamente', async () => {
        const { history } = renderWithRouter(<Provider><App /></Provider>);
        const emailInput =  screen.getByTestId("email-input");
        userEvent.type(emailInput, 'lalala@gmail.com')
        const passInput =  screen.getByTestId("password-input");
        userEvent.type(passInput, '1234567') 
        const loginButton =  screen.getByTestId("login-submit-btn");
        userEvent.click(loginButton);

        await waitFor(() => {
          expect(global.fetch).toHaveBeenCalled();
        })
    });

    test('Testa se os botões de filtro de comidas estão presentes', async () => {
        const { history } = renderWithRouter(<Provider><App /></Provider>);
        const emailInput =  screen.getByTestId("email-input");
        userEvent.type(emailInput, 'lalala@gmail.com')
        const passInput =  screen.getByTestId("password-input");
        userEvent.type(passInput, '1234567') 
        const loginButton =  screen.getByTestId("login-submit-btn");
        userEvent.click(loginButton);

        await waitFor(() => {
          expect(global.fetch).toHaveBeenCalled();
          const seafood = screen.getByTestId('Seafood-category-filter');
          expect(seafood).toBeInTheDocument();
          userEvent.click(seafood);
          const fish = screen.getByText(/Three Fish Pie/i);
          expect(fish).toBeInTheDocument()
        })
    });

    test('Testa se os botões de filtro de bebidas estão presentes', async () => {
      const { history } = renderWithRouter(<Provider><App /></Provider>);
      const emailInput =  screen.getByTestId("email-input");
      userEvent.type(emailInput, 'lalala@gmail.com')
      const passInput =  screen.getByTestId("password-input");
      userEvent.type(passInput, '1234567') 
      const loginButton =  screen.getByTestId("login-submit-btn");
      userEvent.click(loginButton);

      const drinkButton = await screen.findByTestId(/drinks-bottom/i);
      expect(drinkButton).toBeInTheDocument();
      userEvent.click(drinkButton);
      expect(history.location.pathname).toBe('/drinks');

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
        const Cocktail = screen.getByTestId('Cocktail-category-filter');
        expect(Cocktail).toBeInTheDocument();
        userEvent.click(Cocktail);
        const drink = screen.getByText(/Martinez 2/i);
        expect(drink).toBeInTheDocument()
      })
    })
})
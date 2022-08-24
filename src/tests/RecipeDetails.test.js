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

describe('Testa o componente de Detalhes' , () => {
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
          const food = screen.getByTestId('0-card-name');
          userEvent.click(food)
          expect(history.location.pathname).toBe('/foods/52882');
          const shareButton = screen.getByTestId('share-btn');
          expect(shareButton).toBeInTheDocument()
        })
    });
});
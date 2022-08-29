import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
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
    test('Testa se a rota é alterada', async () => {
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
      })
    });

  test('Testa se a receita está na tela', async () => {
      const { history } = renderWithRouter(<Provider><App /></Provider>);
      history.push('/foods/52882');

      await waitFor(() => {

        const nameRecipe = screen.queryByTestId('recipe-title');
        expect(nameRecipe).toBeInTheDocument();
        const imgFav = screen.queryByTestId('favorite-btn');
        expect(imgFav).toHaveAttribute('src', whiteHeartIcon)
        const btnImg = screen.queryByTestId(/favorite-btn/i);
        const btnStart = screen.queryByTestId('start-recipe-btn')
        userEvent.click(btnImg);
        expect(imgFav).toHaveAttribute('src', blackHeartIcon)
        expect(localStorage.getItem('favoriteRecipes')).toBeTruthy();
        userEvent.click(btnStart);
        expect(localStorage.getItem('inProgressRecipes')).toBeTruthy();
      });
  })

  test('Teste se as recomendações aparecem na tela', async () => {
      const { history } = renderWithRouter(<Provider><App /></Provider>);
      const emailInput =  screen.getByTestId("email-input");
      userEvent.type(emailInput, 'lalala@gmail.com')
      const passInput =  screen.getByTestId("password-input");
      userEvent.type(passInput, '1234567') 
      const loginButton =  screen.getByTestId("login-submit-btn");
      userEvent.click(loginButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
        history.push('/foods/52882')

        const recomendationDiv = screen.getByText(/Martinez 2/i)
        expect(recomendationDiv).toBeInTheDocument()
      })
  });
});
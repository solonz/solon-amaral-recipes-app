import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

it('teste o componente Header', async () => {
         
    const {history} = renderWithRouter(<Provider><App /></Provider>);

    history.push('/foods');
    const title = screen.getByRole('heading', {  name: /foods/i});
    expect(title).toBeInTheDocument();

    const profileButton = screen.getByTestId(/profile-top-btn/i);
    expect(profileButton).toBeInTheDocument();

    const searchButton = screen.getByTestId(/search-top-btn/i);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const showInputButton = screen.getByTestId(/exec-search-btn/i);
    expect(showInputButton).toBeInTheDocument();

    const ingredientRadio = screen.getByTestId(/ingredient-search-radio/i);
    expect(ingredientRadio).toBeInTheDocument();

    const nameRadio = screen.getByTestId(/name-search-radio/i);
    expect(nameRadio).toBeInTheDocument();

    const firstLetterRadio = screen.getByTestId(/first-letter-search-radio/i);
    expect(firstLetterRadio).toBeInTheDocument();

    expect(await screen.findByTestId(/search-input/i)).toBeInTheDocument();
    
    userEvent.click(profileButton);
    expect(history.location.pathname).toBe('/profile');
    history.push('/foods');
})

it('teste se a rota /done-recipes tem o botão profile', async () => {
         
    const {history} = renderWithRouter(<Provider><App /></Provider>);

    history.push('/done-recipes');
    expect(history.location.pathname).toBe('/done-recipes');
    const profileButton = screen.getByTestId(/profile-top-btn/i);
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton);
    expect(history.location.pathname).toBe('/profile');
    
})

it('teste se os títulos das páginas são exibidos corretamente', () => {
         
    const {history} = renderWithRouter(<Provider><App /></Provider>);

    history.push('/favorite-recipes');
    expect(history.location.pathname).toBe('/favorite-recipes');
    const titleFavRecipes = screen.getByRole('heading', {  name: /favorite recipes/i});
    expect(titleFavRecipes).toBeInTheDocument();
    
})
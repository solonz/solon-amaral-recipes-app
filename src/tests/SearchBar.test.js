import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

it('teste os elementos do SearchBar na página /foods', async () => {   
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);

    history.push('/foods');
    const showInputButton = screen.getByTestId(/search-top-btn/i);
    expect(showInputButton).toBeInTheDocument();
    userEvent.click(showInputButton);

    const execSearchButton = screen.getByTestId(/exec-search-btn/i);
    expect(execSearchButton).toBeInTheDocument();

    const ingredientRadio = screen.getByTestId(/ingredient-search-radio/i);
    expect(ingredientRadio).toBeInTheDocument();

    const nameRadio = screen.getByTestId(/name-search-radio/i);
    expect(nameRadio).toBeInTheDocument();

    const firstLetterRadio = screen.getByTestId(/first-letter-search-radio/i);
    expect(firstLetterRadio).toBeInTheDocument();

    expect(await screen.findByTestId(/search-input/i)).toBeInTheDocument();
})

it('teste as pesquisas do SearchBar na página /foods', async () => {     
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);

    history.push('/foods');
    const showInputButton = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showInputButton);
    const execSearchButton = screen.getByTestId(/exec-search-btn/i);
    const ingredientRadio = screen.getByTestId(/ingredient-search-radio/i);
    const nameRadio = screen.getByTestId(/name-search-radio/i);
    const firstLetterRadio = screen.getByTestId(/first-letter-search-radio/i);
    const searchInput = screen.findByTestId(/search-input/i);

    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'chicken');
    userEvent.click(execSearchButton);
    const result = await screen.findAllByTestId(/card-name/i);
    expect(result).toHaveLength(12);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'soup');
    userEvent.click(execSearchButton);
    expect(result).toHaveLength(12);

    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput, 'a');
    userEvent.click(execSearchButton);
    expect(result).toHaveLength(12);

})
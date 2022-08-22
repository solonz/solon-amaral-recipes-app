import React from 'react';
import { screen, act } from '@testing-library/react';
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
});

it('teste as pesquisas do SearchBar na página /foods', async () => {     
    renderWithRouter(<Provider> <App /> </Provider>);
    const emailInput =  screen.getByTestId("email-input");
    userEvent.type(emailInput, 'lalala@gmail.com')
    const passInput =  screen.getByTestId("password-input");
    userEvent.type(passInput, '1234567') 
    const loginButton =  screen.getByTestId("login-submit-btn");
    userEvent.click(loginButton);
   
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
});

test('teste o retorno da pesquisa em /drinks',  async () => {     
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);
    // const emailInput =  screen.getByTestId("email-input");
    // userEvent.type(emailInput, 'lalala@gmail.com')
    // const passInput =  screen.getByTestId("password-input");
    // userEvent.type(passInput, '1234567') 
    // const loginButton =  screen.getByTestId("login-submit-btn");
    // userEvent.click(loginButton);
    // const drinkButton = screen.getByTestId(/drinks-bottom-btn/i);
    // userEvent.click(drinkButton);
    history.push('/drinks')
    await act(async () => {
    const showInputButton = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showInputButton);
    const execSearchButton = await screen.findByTestId(/exec-search-btn/i);
    const nameRadio = screen.getByTestId(/name-search-radio/i);
    const searchInput = screen.getByTestId(/search-input/i);
    
    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'gin');
    userEvent.click(execSearchButton);
    const result2 = await screen.findAllByTestId(/card-name/i);
    expect(result2).toHaveLength(12);

    const firstLetterRadio = screen.getByTestId(/first-letter-search-radio/i);
    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput, 'a');
    userEvent.click(execSearchButton);
    expect(result2).toHaveLength(12);
    });
});

test('teste a pesquisa de ingredientes em /drinks',  async () => {     
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);
    history.push('/drinks');
    await act(async () => {
    // const emailInput =  screen.getByTestId("email-input");
    // userEvent.type(emailInput, 'lalala@gmail.com')
    // const passInput =  screen.getByTestId("password-input");
    // userEvent.type(passInput, '1234567') 
    // const loginButton =  screen.getByTestId("login-submit-btn");
    // userEvent.click(loginButton);
    const drinkButton = await screen.findByTestId(/drinks-bottom-btn/i);
    userEvent.click(drinkButton);
    
    const showInputButton = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showInputButton);
    const execSearchButton = await screen.findByTestId(/exec-search-btn/i);
    const searchInput = screen.getByTestId(/search-input/i);
    
    const ingredientRadio = screen.getByTestId(/ingredient-search-radio/i);
    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'lemon');
    userEvent.click(execSearchButton);
    const result2 = await screen.findAllByTestId(/card-name/i);
    expect(result2).toHaveLength(12);
    // const ingredientResult = await screen.findAllByText(/Sour/i);
    // expect(ingredientResult).toHaveLength(4);
    });
});

test('teste a pesquisa de First Letter em /foods',  async () => {     
    
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);
    history.push('/foods');
    await act(async () => {
    // const emailInput =  screen.getByTestId("email-input");
    // userEvent.type(emailInput, 'lalala@gmail.com')
    // const passInput =  screen.getByTestId("password-input");
    // userEvent.type(passInput, '1234567') 
    // const loginButton =  screen.getByTestId("login-submit-btn");
    // userEvent.click(loginButton);
    // document.querySelector('input[name="Choose"]:checked').checked = false;

    const showInputButton = await screen.findByTestId(/search-top-btn/i);
    userEvent.click(showInputButton);
    const execSearchButton = await screen.findByTestId(/exec-search-btn/i);
    const searchInput = screen.getByTestId(/search-input/i);
    const firstLetterRadio = screen.getByTestId(/first-letter-search-radio/i);

    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput, 'a');
    userEvent.click(execSearchButton);
    const firstLetterResult = await screen.findByTestId('0-card-name');
    expect(firstLetterResult).toBeInTheDocument();
    });
});
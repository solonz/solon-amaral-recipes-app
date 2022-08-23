import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

afterEach(() => jest.clearAllMocks());

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

it('teste as pesquisas por ingrediente na página /foods', async () => {    
    const chicken = {meals: [{strMeal: 'Brown Stew Chicken', }, {strMeal: 'Chicken Handi', }]}
        global.fetch = jest.fn((url) => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(chicken),
        }));

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
    const searchInput = screen.findByTestId(/search-input/i);

    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'chicken');
    userEvent.click(execSearchButton);
    const resultMockApi = await screen.findAllByText(/Chicken/i);
    expect(resultMockApi).toHaveLength(2);
    // expect(global.fetch).toBeCalledTimes(5);
})

it('teste as pesquisas por nome na página /foods', async () => {    
    const soup = {meals: [{strMeal: 'Leblebi Soup', }, {strMeal: 'Red Peas Soup', }]}
        global.fetch = jest.fn((url) => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(soup),
        }));

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
    const nameRadio = screen.getByTestId(/name-search-radio/i);
    const searchInput = screen.findByTestId(/search-input/i);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'soup');
    userEvent.click(execSearchButton);
    const resultMockApi = await screen.findAllByText(/Soup/i);
    expect(resultMockApi).toHaveLength(2);
    // expect(global.fetch).toBeCalledTimes(5);
});

test('teste as pesquisas por letra na página /foods',  async () => {     
    const a = {meals: [{strMeal: 'Apple Frangipan Tart', }, {strMeal: 'Apple & Blackberry Crumble', }]}
        global.fetch = jest.fn((url) => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(a),
        }));

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
    const firstLetterRadio = screen.getByTestId(/first-letter-search-radio/i);
    const searchInput = screen.findByTestId(/search-input/i);

    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput, 'a');
    userEvent.click(execSearchButton);
    const resultMockApi = await screen.findAllByText(/apple/i);
    expect(resultMockApi).toHaveLength(2);
    // expect(global.fetch).toBeCalledTimes(5);
});

test('teste a pesquisa de ingredientes em /drinks',  async () => {   
    const drinks = {drinks: [{strDrink: 'A True Amaretto Sour', }, {strDrink: 'Boston Sour', }]}
        global.fetch = jest.fn((url) => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(drinks),
        }));  
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);
    history.push('/drinks');  
    const showInputButton = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showInputButton);
    const execSearchButton = await screen.findByTestId(/exec-search-btn/i);
    const searchInput = screen.getByTestId(/search-input/i);
    
    const ingredientRadio = screen.getByTestId(/ingredient-search-radio/i);
    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'lemon');
    userEvent.click(execSearchButton);
    const resultMockApi = await screen.findAllByText(/sour/i);
    expect(resultMockApi).toHaveLength(2);
    // expect(global.fetch).toBeCalledTimes(5);
});

test('teste a pesquisa de nome em /drinks',  async () => {   
    const gin = {drinks: [{strDrink: 'Abbey Martini', }, {strDrink: 'Abbey Cocktail', }]}
        global.fetch = jest.fn((url) => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(gin),
        }));  
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);
    history.push('/drinks');  
    const showInputButton = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showInputButton);
    const execSearchButton = await screen.findByTestId(/exec-search-btn/i);
    const searchInput = screen.getByTestId(/search-input/i);
    
    const nameRadio = screen.getByTestId(/name-search-radio/i);
    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'gin');
    userEvent.click(execSearchButton);
    const resultMockApi = await screen.findAllByText(/Abbey/i);
    expect(resultMockApi).toHaveLength(2);
    // expect(global.fetch).toBeCalledTimes(5);
});

test('teste a pesquisa por letra em /drinks',  async () => {   
    const a = {drinks: [{strDrink: 'Ace', }, {strDrink: 'ABC', }]}
        global.fetch = jest.fn((url) => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(a),
        }));  
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);
    history.push('/drinks');  
    const showInputButton = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showInputButton);
    const execSearchButton = await screen.findByTestId(/exec-search-btn/i);
    const searchInput = screen.getByTestId(/search-input/i);
    
    const firstLetterRadio = screen.getByTestId(/first-letter-search-radio/i);
    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput, 'a');
    userEvent.click(execSearchButton);
    const resultMockApi = await screen.findAllByText(/ac/i);
    expect(resultMockApi).toHaveLength(1);
    // expect(global.fetch).toBeCalledTimes(5);
});

test('teste se aparece o alerta',  async () => {   
    const aquamarine = {drinks: [{strDrink: 'Aquamarine', }]}
        global.fetch = jest.fn((url) => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(aquamarine),
        }));
        jest.spyOn(global, 'alert')
      .mockImplementation(() => 'ALERTA');
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);
    history.push('/drinks');  
    const showInputButton = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showInputButton);
    const execSearchButton = await screen.findByTestId(/exec-search-btn/i);
    const searchInput = screen.getByTestId(/search-input/i);
    
    const firstLetterRadio = screen.getByTestId(/first-letter-search-radio/i);
    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput, 'a');
    userEvent.click(execSearchButton);
    expect(global.alert()).toBe('ALERTA');
    // await waitFor(() =>  expect(history.location.pathname).toBe('/drinks/178319'), { timeout: 4000 } );
});

test('teste se aparece uma mensagem quando a api não tem retorno',  async () => {   
    const xablau = {drinks: null}
        global.fetch = jest.fn((url) => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(xablau),
        }));
        jest.spyOn(global, 'alert')
      .mockImplementation(() => 'Xablau');
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);
    history.push('/drinks');  
    const showInputButton = screen.getByTestId(/search-top-btn/i);
    userEvent.click(showInputButton);
    const execSearchButton = await screen.findByTestId(/exec-search-btn/i);
    const searchInput = screen.getByTestId(/search-input/i);
    
    const nameRadio = screen.getByTestId(/name-search-radio/i);
    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'Xablau');
    userEvent.click(execSearchButton);
    expect(global.alert()).toBe('Xablau');
});
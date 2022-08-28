import React from 'react';
import { screen } from '@testing-library/react';
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

afterEach(() => jest.clearAllMocks());
beforeEach(chamadaAPI);

it('teste os elementos do RecipeInProgress na página /foods', async () => {   
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);

    history.push('/foods');
    const food = await screen.findByText(/Three Fish Pie/i);
    expect(food).toBeInTheDocument();
    userEvent.click(food);

    const startButton = await screen.findByTestId(/start-recipe-btn/i);
    expect(startButton).toBeInTheDocument();
    userEvent.click(startButton);

    const img = await screen.findByTestId(/recipe-photo/i);
    expect(img).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId(/recipe-title/i);
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId(/recipe-category/i);
    expect(recipeCategory).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
    const ingredients = await screen.findAllByTestId(/ingredient-step/i);
    expect(ingredients).toHaveLength(14);
    const checkbox1 = screen.getByRole('checkbox', {  name: /potatoes/i});
    userEvent.click(checkbox1);
    const shareButton = screen.getByTestId(/share-btn/i);
    expect(shareButton).toBeInTheDocument();
    const favButton = screen.getByTestId(/favorite-btn/i);
    expect(favButton).toBeInTheDocument();
    const finishButton = screen.getByTestId(/finish-recipe-btn/i);
    expect(finishButton).toBeInTheDocument();
});

it('teste os elementos do RecipeInProgress na página /drinks', async () => {   
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);
    const emailInput =  screen.getByTestId("email-input");
    userEvent.type(emailInput, 'lalala@gmail.com')
    const passInput =  screen.getByTestId("password-input");
    userEvent.type(passInput, '1234567') 
    const loginButton =  screen.getByTestId("login-submit-btn");
    userEvent.click(loginButton);
    const drinkButton = await screen.findByTestId(/drinks-bottom-btn/i);
    userEvent.click(drinkButton);
    history.push('/drinks/17256/in-progress');

    const img = await screen.findByTestId(/recipe-photo/i);
    expect(img).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId(/recipe-title/i);
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId(/recipe-category/i);
    expect(recipeCategory).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
    const ingredients = await screen.findAllByTestId(/ingredient-step/i);
    expect(ingredients).toHaveLength(4);
    const checkbox1 = screen.getByRole('checkbox', {  name: /gin/i});
    userEvent.click(checkbox1);
    const checkbox2 = screen.getByRole('checkbox', {  name: /Sweet Vermouth/i});
    userEvent.click(checkbox2);
    const checkbox3 = screen.getByRole('checkbox', {  name: /Maraschino Liqueur/i});
    userEvent.click(checkbox3);
    const checkbox4 = screen.getByRole('checkbox', {  name: /Angostura Bitters/i});
    userEvent.click(checkbox4);
    const shareButton = screen.getByTestId(/share-btn/i);
    expect(shareButton).toBeInTheDocument();
    const favButton = screen.getByTestId(/favorite-btn/i);
    expect(favButton).toBeInTheDocument();
    const finishButton = screen.getByTestId(/finish-recipe-btn/i);
    expect(finishButton).toBeInTheDocument();
    userEvent.click(finishButton);
    expect(history.location.pathname).toBe('/done-recipes');
});

it('teste a função de favoritar na página /foods', async () => {   
  const {history} = renderWithRouter(<Provider> <App /> </Provider>);
  const emailInput =  screen.getByTestId("email-input");
  userEvent.type(emailInput, 'lalala@gmail.com')
  const passInput =  screen.getByTestId("password-input");
  userEvent.type(passInput, '1234567') 
  const loginButton =  screen.getByTestId("login-submit-btn");
  userEvent.click(loginButton);
  const drinkButton = await screen.findByTestId(/drinks-bottom-btn/i);
  userEvent.click(drinkButton);
  history.push('/foods/53060/in-progress');

  const img = await screen.findByTestId(/recipe-photo/i);
  expect(img).toBeInTheDocument();
  const recipeTitle = await screen.findByTestId(/recipe-title/i);
  expect(recipeTitle).toBeInTheDocument();
  const recipeCategory = await screen.findByTestId(/recipe-category/i);
  expect(recipeCategory).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalled();
  
  const favButton = screen.getByTestId(/favorite-btn/i);
  expect(favButton).toBeInTheDocument();
  userEvent.click(favButton);
  expect(favButton).toBeInTheDocument();
});

it('teste a função de favoritar na página /drinks', async () => {   
  const {history} = renderWithRouter(<Provider> <App /> </Provider>);
  const emailInput =  screen.getByTestId("email-input");
  userEvent.type(emailInput, 'lalala@gmail.com')
  const passInput =  screen.getByTestId("password-input");
  userEvent.type(passInput, '1234567') 
  const loginButton =  screen.getByTestId("login-submit-btn");
  userEvent.click(loginButton);
  const drinkButton = await screen.findByTestId(/drinks-bottom-btn/i);
  userEvent.click(drinkButton);
  history.push('drinks/178319/in-progress');

  const img = await screen.findByTestId(/recipe-photo/i);
  expect(img).toBeInTheDocument();
  const recipeTitle = await screen.findByTestId(/recipe-title/i);
  expect(recipeTitle).toBeInTheDocument();
  const recipeCategory = await screen.findByTestId(/recipe-category/i);
  expect(recipeCategory).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalled();
  
  const favButton = screen.getByTestId(/favorite-btn/i);
  expect(favButton).toBeInTheDocument();
  userEvent.click(favButton);
  expect(favButton).toBeInTheDocument();
});
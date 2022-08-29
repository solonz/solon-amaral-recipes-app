import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

test('teste os elementos na página /done-recipes', () => {   
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);

    history.push('/done-recipes');
    const title = screen.getByRole('heading', {  name: /done recipes/i});
    expect(title).toBeInTheDocument();

    const profileButton = screen.getByTestId(/profile-top-btn/i);
    expect(profileButton).toBeInTheDocument();

    const buttonAll = screen.getByRole('button', {  name: /all/i});
    expect(buttonAll).toBeInTheDocument();

    const buttonFood = screen.getByRole('button', {  name: /food/i});
    expect(buttonFood).toBeInTheDocument();

    const buttonDrinks = screen.getByRole('button', {  name: /drinks/i});
    expect(buttonDrinks).toBeInTheDocument();
});

test('teste se o link vai para /foods/52771 ', () => {   
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);

    history.push('/done-recipes');
    const foodLink = screen.getByText(/spicy arrabiata penne/i);
    expect(foodLink).toBeInTheDocument();
    userEvent.click(foodLink);
    expect(history.location.pathname).toBe('/foods/52771');
});

test('teste se o link vai para /drinks/178319 ', () => {   
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);

    history.push('/done-recipes');
    const drinksLink = screen.getByText(/aquamarine/i);
    expect(drinksLink).toBeInTheDocument();
    userEvent.click(drinksLink);
    expect(history.location.pathname).toBe('/drinks/178319');
});

test('teste os filtros da página Done Recipes', () => {   
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);

    history.push('/done-recipes');
    const buttonFood = screen.getByRole('button', {  name: /food/i});
    userEvent.click(buttonFood);
    const foodImg = screen.getByTestId(/0-horizontal-image/i);
    expect(foodImg).toBeInTheDocument();
    const foodName = screen.getByText(/italian \- vegetarian/i);
    expect(foodName).toBeInTheDocument();
    const doneDate = screen.getByText(/23\/06\/2020/i);
    expect(doneDate).toBeInTheDocument();
    const foodTag1 = screen.getByText(/pasta/i);
    expect(foodTag1).toBeInTheDocument();
    const foodTag2 = screen.getByText(/curry/i);
    expect(foodTag2).toBeInTheDocument();
    const shareButton = screen.getByTestId(/horizontal-share-btn/i);
    expect(shareButton).toBeInTheDocument();

    const buttonDrinks = screen.getByRole('button', {  name: /drinks/i});
    userEvent.click(buttonDrinks);
    const drinkImg = screen.getByTestId(/0-horizontal-image/i);
    expect(drinkImg).toBeInTheDocument();
    const alcoholic = screen.getByTestId(/0-horizontal-top-text/i);
    expect(alcoholic).toBeInTheDocument();
    const drinkName = screen.getByTestId(/0-horizontal-name/i);
    expect(drinkName).toBeInTheDocument();
    const doneDateDrinks = screen.getByTestId(/0-horizontal-done-date/i);
    expect(doneDateDrinks).toBeInTheDocument();
    const shareButtonDrinks = screen.getByTestId('0-horizontal-share-btn');
    expect(shareButtonDrinks).toBeInTheDocument();

    const buttonAll = screen.getByRole('button', {  name: /all/i});
    userEvent.click(buttonAll);
    const imgs = screen.getAllByTestId(/horizontal-image/i);
    expect(imgs).toHaveLength(2);

});

test('teste o clipboard food', async () => { 
    Object.assign(window.navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation(() => Promise.resolve()),
        },
      });
    
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);

    history.push('/done-recipes');
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareButton);
    const linkCopied = await screen.findAllByText(/Link copied!/i);
    expect(linkCopied).toHaveLength(1);

    expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52771');
});

test('teste o clipboard drinks', async () => { 
    Object.assign(window.navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation(() => Promise.resolve()),
        },
      });
    
    const {history} = renderWithRouter(<Provider> <App /> </Provider>);

    history.push('/done-recipes');
    const shareButton = screen.getByTestId('1-horizontal-share-btn');
    userEvent.click(shareButton);
    const linkCopied = await screen.findAllByText(/Link copied!/i);
    expect(linkCopied).toHaveLength(1);

    expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/178319');
});
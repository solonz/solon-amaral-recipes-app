import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Foods from '../Pages/Foods';
import Drinks from '../Pages/Drinks';
import Provider from '../context/Provider';

describe('teste o componente Footer', () => {
    test('Teste se o Footer renderiza corretamente', () => {
        const { history } = renderWithRouter(<Provider><Foods /></Provider>);

        const drinkButton = screen.getByTestId(/drinks-bottom/i);
        const foodButton = screen.getByTestId(/food-bottom/i);
        expect(drinkButton).toBeInTheDocument();
        expect(foodButton).toBeInTheDocument();
        userEvent.click(drinkButton);
        expect(history.location.pathname).toBe('/drinks');
        
    });

    test('Teste o botão food na página "/drinks"', () => {
        const { history } = renderWithRouter(<Provider><Drinks /></Provider>);
        const foodButton = screen.getByTestId(/food-bottom/i);
        userEvent.click(foodButton);
        expect(history.location.pathname).toBe('/foods');
    })
})
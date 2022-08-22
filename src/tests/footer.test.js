import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

describe('teste o componente Footer', () => {
    test('Teste se o Footer renderiza corretamente', async () => {
        const { history } = renderWithRouter(<Provider><App /></Provider>);
        history.push('/food');

        const drinkButton = await screen.findByTestId(/drinks-bottom/i);
        const foodButton = screen.getByTestId(/food-bottom/i);
        expect(drinkButton).toBeInTheDocument();
        expect(foodButton).toBeInTheDocument();
        userEvent.click(drinkButton);
        expect(history.location.pathname).toBe('/drinks');
        
    });

    test('Teste o botão food na página "/drinks"', async () => {
        const { history } = renderWithRouter(<Provider><App /></Provider>);
        history.push('/drinks');

        const foodButton = await screen.findByTestId(/food-bottom/i);
        userEvent.click(foodButton);
        expect(history.location.pathname).toBe('/foods');
    })
})
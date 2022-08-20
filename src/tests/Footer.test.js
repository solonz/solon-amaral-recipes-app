import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Foods from '../Pages/Foods';

describe('teste o componente Footer', () => {
    test('Teste se o Footer renderiza corretamente', async () => {
        const { history } = renderWithRouter(<Foods />);

        const drinkButton = screen.getByTestId(/drinks-bottom/i);
        const foodButton = screen.getByTestId(/food-bottom/i);
        expect(drinkButton).toBeInTheDocument();
        expect(foodButton).toBeInTheDocument();
        userEvent.click(drinkButton);
        expect(history.location.pathname).toBe('/drinks');
        userEvent.click(foodButton);
        expect(history.location.pathname).toBe('/foods');
    });
})
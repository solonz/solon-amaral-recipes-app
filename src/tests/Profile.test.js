import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../Pages/Profile';

describe('Verifica funcionalidades da página de Perfil', () => {
    it('', () => {
        const {history} = renderWithRouter(<App />);
        const profileEmail = screen.getByTestId(/profile-email/i);
        expect(profileEmail).toBeInTheDocument();

        const DoneButton = screen.getByRole('button', { name: /done/i });
        expect(DoneButton).toBeInTheDocument();

        const FavoriteButton = screen.getByRole('button', { name: /favorite/i });
        expect(FavoriteButton).toBeInTheDocument();

        const LogoutButton = screen.getByRole('button', { name: /logout/i });
        expect(LogoutButton).toBeInTheDocument();

        userEvent.click(DoneButton);
        expect(history.location.pathname).toBe('/done-recipes');
        userEvent.click(FavoriteButton);
        expect(history.location.pathname).toBe('/favorite-recipes');
        userEvent.click(LogoutButton);
        expect(history.location.pathname).toBe('/');
    })
});

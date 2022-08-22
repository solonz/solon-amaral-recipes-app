import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

describe('Verifica funcionalidades da página de Perfil', () => {
    it('testa a tela de Perfil',() => {
        const {history} = renderWithRouter(<Provider> <App /></Provider>);
        history.push('/profile');
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
    });

    it('testa a tela de Perfil',() => {
        const {history} = renderWithRouter(<Provider> <App /></Provider>);
        history.push('/profile');

        const FavoriteButton = screen.getByRole('button', { name: /favorite/i });
        expect(FavoriteButton).toBeInTheDocument();
        
        userEvent.click(FavoriteButton);
        expect(history.location.pathname).toBe('/favorite-recipes');
    });

    it('testa a tela de Perfil',() => {
        const {history} = renderWithRouter(<Provider> <App /></Provider>);
        history.push('/profile');

        const LogoutButton = screen.getByRole('button', { name: /logout/i });
        expect(LogoutButton).toBeInTheDocument();
        
        userEvent.click(LogoutButton);
        expect(history.location.pathname).toBe('/');
    });

    it('testa a local storage',async () => {
        const {history} = renderWithRouter(<Provider> <App /></Provider>);
        const emailInput = await screen.findByTestId("email-input");
        userEvent.type(emailInput, 'aaaa@aaaa.com')
        const passInput = await screen.findByTestId("password-input");
        userEvent.type(passInput, '1234567') 
        const loginButton = await screen.findByTestId("login-submit-btn");
        userEvent.click(loginButton);
        const profileButton = screen.getByTestId(/profile-top-btn/i);
        userEvent.click(profileButton);

        // history.push('/profile');
        expect(localStorage.getItem('user')).toBeTruthy();
        expect(screen.getByText('aaaa@aaaa.com')).toBeInTheDocument();
    });
});

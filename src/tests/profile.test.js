import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../Pages/Profile';
import Login from '../Pages/Profile';


describe('Verifica funcionalidades da página de Perfil', () => {
    // it('testa se a tela de perfil exibe corretamente', () => {
    //     renderWithRouter(<Login />);
    // //    history.push('/');
    //     const emailInput = screen.getByTestId(/email-input/i);
    //     const passwordInput = screen.getByTestId(/password-input/i);
    //     const loginButton = screen.getByTestId(/login-submit/i);
    //     userEvent.type(emailInput, 'lalala@gmail.com');
    //     userEvent.type(passwordInput, '1234567');
    //     userEvent.click(loginButton);
    //     expect(history.location.pathname).toBe('/profile');
    // })

    it('testa a tela de Perfil',() => {
        const {history} = renderWithRouter(<App />);
        const profileEmail = screen.getByTestId(/profile-email/i);
        expect(profileEmail).toBeInTheDocument();

        const DoneButton = screen.getByRole('button', { name: /done/i });
        expect(DoneButton).toBeInTheDocument();

        const FavoriteButton = screen.getByRole('button', { name: /favorite/i });
        expect(FavoriteButton).toBeInTheDocument();

        const LogoutButton = screen.getByRole('button', { name: /logout/i });
        expect(LogoutButton).toBeInTheDocument();

        // expect(localStorage.getItem('email')).toBeTruthy();

        userEvent.click(DoneButton);
        expect(history.location.pathname).toBe('/done-recipes');
        userEvent.click(FavoriteButton);
        expect(history.location.pathname).toBe('/favorite-recipes');
        userEvent.click(LogoutButton);
        expect(history.location.pathname).toBe('/');
    })
});

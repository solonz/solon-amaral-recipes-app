import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../Pages/Profile';

describe('Verifica funcionalidades da página de Perfil', () => {
    // it('testa se a tela de perfil exibe corretamente', async () => {
    //     // history.push('/');

    //     const {history} = renderWithRouter(<App />);
    //     await history.push('/');
    //     expect(history.location.pathname).toBe('/');

    //     // const emailInput = await screen.getByTestId(/email-input/i);
    //       const emailInput = await waitFor(() => screen.findByTestId(/email-input/i));
    //       const passwordInput = await waitFor(() => screen.findByTestId(/password-input/i));
    //       const loginButton = await waitFor(() => screen.findByTestId(/login-submit/i), { timeout: 4000 });
    //     //   expect(loginButton).toBeInTheDocument();

    //     // const passwordInput = screen.getByTestId(/password-input/i);
    //     // const loginButton = screen.getByTestId(/login-submit/i);
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
        
        userEvent.click(DoneButton);
        expect(history.location.pathname).toBe('/done-recipes');
        userEvent.click(FavoriteButton);
        expect(history.location.pathname).toBe('/favorite-recipes');
        userEvent.click(LogoutButton);
        expect(history.location.pathname).toBe('/');
    })
});

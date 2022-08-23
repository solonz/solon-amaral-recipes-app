import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import Foods from '../Pages/Foods';
import Provider from '../context/Provider';
import renderWithRouter from '../tests/helpers/renderWithRouter';
import data from './helpers/mockData';


const chamadaAPI = () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(data),
  });
};

describe('Foods page', () => {
  beforeEach(chamadaAPI)
  afterEach(() => jest.clearAllMocks());
    test('Testa a chamada da API', async () => {
        renderWithRouter(<Foods />);
        expect(global.fetch).toHaveBeenCalled();
        await waitFor(() => {
          const food = screen.findByTestId
        })
    });
})
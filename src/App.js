import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import './App.css';
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import Details from './Pages/Details';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/{id-da-receita}" component={ Details } />
      <Route exact path="/drinks/{id-da-receita}" component={ Details } />
      <Route exact path="/foods/{id-da-receita}/in-progress" />
      <Route exact path="/drinks/{id-da-receita}/in-progress" />
      <Route path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;

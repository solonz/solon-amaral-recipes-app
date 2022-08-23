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
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:idMeal" component={ Details } />
        <Route exact path="/drinks/:idDrink" component={ Details } />
        <Route exact path="/foods/:idMeal/in-progress" />
        <Route exact path="/drinks/:idDrink/in-progress" />
        <Route path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}

export default App;

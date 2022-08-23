import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import './App.css';
import Details from './Pages/Details';
import Recipes from './components/Recipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/foods/:idMeal" component={ Details } />
      <Route exact path="/drinks/:idDrink" component={ Details } />
      <Route exact path="/foods/:idMeal/in-progress" />
      <Route exact path="/drinks/:idDrink/in-progress" />
      <Route path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;

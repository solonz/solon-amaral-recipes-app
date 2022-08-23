import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import RecipeDetails from './Pages/RecipeDetails';
import './App.css';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:idMeal" component={ RecipeDetails } />
        <Route exact path="/drinks/:idDrink" component={ RecipeDetails } />
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

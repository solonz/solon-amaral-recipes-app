import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import './App.css';
import Recipes from './components/Recipes';
import RecipeDetails from './Pages/RecipeDetails';
import RecipeInProgress from './Pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/foods/:idMeal" component={ RecipeDetails } />
      <Route exact path="/drinks/:idDrink" component={ RecipeDetails } />
      <Route exact path="/foods/:idMeal/in-progress" component={ RecipeInProgress } />
      <Route exact path="/drinks/:idDrink/in-progress" component={ RecipeInProgress } />
      <Route path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../context/Context';
import { getMealRecipe, getDrinkRecipe } from '../services/getRecipe';

function RecipeInProgress() {
  const { idMeal, idDrink } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [arrRecipes, setArrRecipes] = useState([]);
  const { foods, drinks } = useContext(Context);

  const renderRecipes = (id) => {
    const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (id === idMeal && idMeal) {
      const comidas = Object.keys(recipes.meals);
      const arrComidas = comidas.map((elt) => (
        foods.meals.find((food) => food.idMeal === elt)));
      setArrRecipes(arrComidas);
    }
    if (id === idDrink && idDrink) {
      const bebidas = Object.keys(recipes.cocktails);
      const arrBebidas = bebidas.map((elt) => (
        drinks.drinks.find((dr) => dr.idDrink === elt)));
      setArrRecipes(arrBebidas);
    }
  };

  useEffect(() => {
    const getRecipeInProgressDetails = () => {
      if (idMeal) {
        const waitMealInProgress = async () => {
          const data = await getMealRecipe(idMeal);
          setRecipe(data[0]);
        };
        waitMealInProgress();
        renderRecipes(idMeal);
      }
      if (idDrink) {
        const waitDrinkInProgress = async () => {
          const data = await getDrinkRecipe(idDrink);
          setRecipe(data[0]);
        };
        renderRecipes(idDrink);
        waitDrinkInProgress();
      }
    };
    getRecipeInProgressDetails();
  }, []);

  const createNewArray = () => {
    if (idMeal) {
      const arrayNew = [{
        id: idMeal,
        type: 'food',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
        doneDate: '', // aqui pede 'quando-a-receita-foi-concluida' -> e não sei como fazer isso
        tags: [recipe.strTags],
      }];
      localStorage.setItem('doneRecipes', JSON.stringify(arrayNew));
    }
    if (idDrink) {
      console.log(recipe);
      const arrayNew = [{
        id: idDrink,
        type: 'drink',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
        doneDate: '', // aqui pede 'quando-a-receita-foi-concluida' -> e não sei como fazer isso
        tags: [recipe.strTags],
      }];
      localStorage.setItem('doneRecipes', JSON.stringify(arrayNew));
    }
  };

  const refreshTheArray = (doneRecipesList) => {
    if (idMeal) {
      const arrayRefresh = [
        ...doneRecipesList,
        { id: idMeal,
          type: 'food',
          nationality: recipe.strArea,
          category: recipe.strCategory,
          alcoholicOrNot: '',
          name: recipe.strMeal,
          image: recipe.strMealThumb,
          doneDate: '', // aqui pede 'quando-a-receita-foi-concluida' -> e não sei como fazer isso
          tags: [recipe.strTags],
        }];
      localStorage.setItem('doneRecipes', JSON.stringify(arrayRefresh));
    }
    if (idDrink) {
      const arrayRefresh = [
        ...doneRecipesList,
        { id: idDrink,
          type: 'drink',
          nationality: recipe.strArea,
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic,
          name: recipe.strDrink,
          image: recipe.strDrinkThumb,
          doneDate: '', // aqui pede 'quando-a-receita-foi-concluida' -> e não sei como fazer isso
          tags: [recipe.strTags],
        }];
      localStorage.setItem('doneRecipes', JSON.stringify(arrayRefresh));
    }
  };

  const setDone = () => {
    const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesList === null) { createNewArray(); }
    if (doneRecipesList !== null) { refreshTheArray(doneRecipesList); }
  };

  return (
    <div>
      <h1>In Progress</h1>
      { arrRecipes.map((rec, id) => (
        <div key={ id }>
          <h2 data-testid="recipe-title">{rec.strMeal || rec.strDrink }</h2>
          <img
            alt=""
            width="300px"
            data-testid="recipe-photo"
            src={ rec.strDrinkThumb || rec.strMealThumb }
          />
          <h4
            data-testid="recipe-category"
          >
            { rec.strMeal ? rec.strCategory : '' }
          </h4>
          <h5>Ingredients</h5>
          <ul>
            {}
          </ul>
          <button
            type="button"
            data-testid="share-btn"
          >
            Share
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            Favorite
          </button>
          <button type="button" onClick={ setDone } data-testid="finish-recipe-btn">
            Finish Recipe
          </button>
        </div>
      )) }
    </div>
  );
}

export default RecipeInProgress;

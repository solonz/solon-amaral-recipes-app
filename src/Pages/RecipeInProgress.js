import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMealRecipe, getDrinkRecipe } from '../services/getRecipe';

function RecipeInProgress() {
  const { idMeal, idDrink } = useParams();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const getRecipeInProgressDetails = () => {
      if (idMeal) {
        const waitMealInProgress = async () => {
          const data = await getMealRecipe(idMeal);
          setRecipe(data[0]);
        };
        waitMealInProgress();
      }
      if (idDrink) {
        const waitDrinkInProgress = async () => {
          const data = await getDrinkRecipe(idDrink);
          setRecipe(data[0]);
        };
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
      <button type="button" onClick={ setDone } data-testid="finish-recipe-btn">
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;

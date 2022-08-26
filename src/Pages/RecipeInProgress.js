import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getMealRecipe, getDrinkRecipe } from '../services/getRecipe';
import shareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const { idMeal, idDrink } = useParams();
  const [recipe, setRecipe] = useState('');
  const showMsg = 'Link Copied!';
  const { isFavorite, setIsFavorite } = useContext(Context);
  const num9 = 9;
  const num21 = 21;
  const num29 = 29;
  const num34 = 34;

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
        alcoholicOrNot: recipe.item.strAlcoholic ? recipe.item.strAlcoholic : '',
        name: recipe.strMeal ? recipe.strMeal : item.strDrink,
        image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
        doneDate: '', // aqui pede 'quando-a-receita-foi-concluida' -> e não sei como fazer isso
        tags: [recipe.strTags],
      }];
      localStorage.setItem('doneRecipes', JSON.stringify(arrayNew));
    }
    if (idDrink) {
      const arrayNew = [{
        id: idDrink,
        type: 'drink',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: recipe.item.strAlcoholic ? recipe.item.strAlcoholic : '',
        name: recipe.strMeal ? recipe.strMeal : item.strDrink,
        image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
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
          alcoholicOrNot: recipe.item.strAlcoholic ? recipe.item.strAlcoholic : '',
          name: recipe.strMeal ? recipe.strMeal : item.strDrink,
          image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
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
          alcoholicOrNot: recipe.item.strAlcoholic ? recipe.item.strAlcoholic : '',
          name: recipe.strMeal ? recipe.strMeal : item.strDrink,
          image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
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

  const handleClick = () => {

  };

  const handleFavorite = () => {
    if (isFavorite === false) {
      setIsFavorite(true);
      const favoritesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoritesList === null) { createNewArray(); }
      if (favoritesList !== null) { refreshTheArray(favoritesList); }
    }
    if (isFavorite === true) {
      setIsFavorite(false);
      const favoritesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
      removeFavorite(favoritesList);
    }
  };

  return (
    <div>
      <h1>In Progress</h1>
      <img
        src={ recipe.strDrinkThumb || recipe.strMealThumb }
        alt=" "
        data-testid="recipe-photo"
        width="300px"
      />
      <h4 data-testid="recipe-title">{recipe.strDrink || recipe.strMeal}</h4>
      <button
        type="button"
        onClick={ () => handleClick() }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt=" "
        />
      </button>
      {!showMsg && (<span>{msgCopied}</span>)}
      <button type="button" onClick={ handleFavorite }>
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt=""
        />
      </button>
      {recipe.strMeal ? (
        <p data-testid="recipe-category">
          {`${recipe.strArea} - ${recipe.strCategory}`}
        </p>)
        : (
          <p data-testid="recipe-category">
            {`${recipe.strCategory}`}
          </p>
        )}
      <h5>Ingredients</h5>

      { recipe.idMeal && Object.values(recipe).slice(num9, num29)
        .filter((ele) => ele !== null && ele !== '')
        .map((item, i) => (
          <p key={ i } data-testid={ `${i}-ingredient-step` }>
            {item}
            {' '}
          </p>
        ))}

      <h5>Instructions</h5>

      { recipe.idDrink && Object.values(recipe).slice(num21, num34)
        .filter((ele) => ele !== null && ele !== '')
        .map((item, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-step` }>
            {item}
            {' '}
          </p>
        ))}

      <p data-testid="instructions">{recipe.strInstructions}</p>

      <button type="button" onClick={ setDone } data-testid="finish-recipe-btn">
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;

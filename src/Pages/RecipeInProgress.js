import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMealRecipe, getDrinkRecipe } from '../services/getRecipe';
import shareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import CheckBox from '../components/CheckBox';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const history = useHistory();
  const { idMeal, idDrink } = useParams();
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const { isFavorite, setIsFavorite, copied, setCopied } = useContext(Context);
  const num9 = 9;
  const num21 = 21;
  const num29 = 29;
  const num35 = 35;

  useEffect(() => {
    setCopied(false);
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
    const favoritesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoritesList !== null) {
      setIsFavorite(true);
    }
    getRecipeInProgressDetails();
  }, []);

  const createNewArray = () => {
    if (idMeal) {
      const arrayNew = [{
        id: idMeal,
        type: 'food',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
        name: recipe.strMeal ? recipe.strMeal : recipe.strDrink,
        image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
        doneDate: '', // aqui pede 'quando-a-receita-foi-concluida' -> e não sei como fazer isso
        tags: [recipe.strTags],
      }];
      localStorage.setItem('doneRecipes', JSON.stringify(arrayNew));
      delete arrayNew[0].doneDate;
      delete arrayNew[0].tags;
      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayNew));
    }
    if (idDrink) {
      const arrayNew = [{
        id: idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
        name: recipe.strMeal ? recipe.strMeal : recipe.strDrink,
        image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
        doneDate: '', // aqui pede 'quando-a-receita-foi-concluida' -> e não sei como fazer isso
        tags: [recipe.strTags],
      }];
      localStorage.setItem('doneRecipes', JSON.stringify(arrayNew));
      delete arrayNew[0].doneDate;
      delete arrayNew[0].tags;
      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayNew));
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
          alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
          name: recipe.strMeal ? recipe.strMeal : recipe.strDrink,
          image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
          doneDate: '', // aqui pede 'quando-a-receita-foi-concluida' -> e não sei como fazer isso
          tags: [recipe.strTags],
        }];
      localStorage.setItem('doneRecipes', JSON.stringify(arrayRefresh));
      delete arrayRefresh[0].doneDate;
      delete arrayRefresh[0].tags;
      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayRefresh));
    }
    if (idDrink) {
      const arrayRefresh = [
        ...doneRecipesList,
        { id: idDrink,
          type: 'drink',
          nationality: '',
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
          name: recipe.strMeal ? recipe.strMeal : recipe.strDrink,
          image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
          doneDate: '', // aqui pede 'quando-a-receita-foi-concluida' -> e não sei como fazer isso
          tags: [recipe.strTags],
        }];
      localStorage.setItem('doneRecipes', JSON.stringify(arrayRefresh));
      delete arrayRefresh[0].doneDate;
      delete arrayRefresh[0].tags;
      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayRefresh));
    }
  };
  const setDone = () => {
    const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesList === null) { createNewArray(); }
    if (doneRecipesList !== null) { refreshTheArray(doneRecipesList); }
    history.push('/done-recipes');
  };
  const removeFavorite = (favoritesList) => {
    if (idMeal) {
      const arrayAfterRemoved = favoritesList.filter(({ id }) => id !== idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayAfterRemoved));
    }
    if (idDrink) {
      const arrayAfterRemoved = favoritesList.filter(({ id }) => id !== idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayAfterRemoved));
    }
  };
  const handleFavorite = () => {
    if (isFavorite === false) {
      setIsFavorite(true);
      const favoritesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoritesList === null) { createNewArray(); return; }
      if (favoritesList !== null) { refreshTheArray(favoritesList); }
    }
    if (isFavorite === true) {
      setIsFavorite(false);
      const favoritesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
      removeFavorite(favoritesList);
    }
  };
  const handleIsDisabled = (i) => {
    setIngredients((prevState) => [...prevState, i]);
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const foodIngredArray = recipe.idMeal && Object.values(recipe).slice(num9, num29)
      .filter((ele) => ele !== null && ele !== '');
    const drinkIngredArray = recipe.idDrink && Object.values(recipe).slice(num21, num35)
      .filter((ele) => ele !== null && ele !== '');
    if (idMeal && foodIngredArray.length - 1 === local.meals[idMeal].length) {
      setIsDisabled(false);
    }
    if (idDrink && drinkIngredArray.length - 1 === local.cocktails[idDrink].length) {
      setIsDisabled(false);
    }
  };
  const copyContent = () => {
    if (idMeal) {
      copy(`http://localhost:3000/foods/${idMeal}`); setCopied(true);
      return;
    }
    if (idDrink) {
      copy(`http://localhost:3000/drinks/${idDrink}`); setCopied(true);
    }
  };
  useEffect(() => {
    if (idMeal) {
      const foodIngredients = { meals: { [idMeal]: ingredients } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(foodIngredients));
    }
    if (idDrink) {
      const drinkIngredients = { cocktails: { [idDrink]: ingredients } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(drinkIngredients));
    }
  }, [ingredients]);

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
          <div key={ i } onChange={ () => handleIsDisabled(i) }>
            <CheckBox item={ item } index={ i } />
          </div>
        ))}

      { recipe.idDrink && Object.values(recipe).slice(num21, num35)
        .filter((ele) => ele !== null && ele !== '')
        .map((item, index) => (
          <div key={ index } onChange={ () => handleIsDisabled(index) }>
            <CheckBox item={ item } index={ index } />
          </div>
        ))}
      <h5>Instructions</h5>
      <p data-testid="instructions">{recipe.strInstructions}</p>

      <button
        type="button"
        disabled={ isDisabled }
        onClick={ setDone }
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
      <h6>{ copied && 'Link copied!' }</h6>
      <button type="button" onClick={ copyContent }>
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt=""
        />
      </button>
      <button type="button" onClick={ handleFavorite }>
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt=""
        />
      </button>
    </div>
  );
}
export default RecipeInProgress;

// import { Carousel } from 'bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import Context from '../context/Context';
import { getMealRecipe, getDrinkRecipe } from '../services/getRecipe';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const { idMeal, idDrink } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const { drinks, foods, copied, setCopied } = useContext(Context);
  const history = useHistory();
  const num6 = 6;

  const getRecipeDetails = () => {
    const inProgressList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));

    if (idMeal) {
      const waitMeal = async () => {
        const data = await getMealRecipe(idMeal);
        setRecipe(data);
        setMeasures(Object.keys(data[0]).filter((e) => e.includes('strMeasure')));
        setIngredients(Object.keys(data[0]).filter((e) => e.includes('strIngredient')));
        if (inProgressList !== null) {
          setInProgress(Object.keys(inProgressList.meals).includes(idMeal));
        }
        if (doneRecipesList !== null) {
          setIsDone(doneRecipesList.some(({ id }) => id === idMeal));
        }
      };
      waitMeal();
    }
    if (idDrink) {
      const waitDrink = async () => {
        const data = await getDrinkRecipe(idDrink);
        setRecipe(data);
        setMeasures(Object.keys(data[0]).filter((e) => e.includes('strMeasure')));
        setIngredients(Object.keys(data[0]).filter((e) => e.includes('strIngredient')));
        if (inProgressList !== null) {
          setInProgress(Object.keys(inProgressList.cocktails).includes(idDrink));
        }
        if (doneRecipesList !== null) {
          setIsDone(doneRecipesList.some(({ id }) => id === idDrink));
        }
      };
      waitDrink();
    }
  };

  useEffect(() => { getRecipeDetails(); }, []);

  const saveThisProgress = () => {
    const inProgressList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressList === null) {
      if (idMeal) {
        const firstMeal = { cocktails: { }, meals: { [idMeal]: [] } };
        localStorage.setItem('inProgressRecipes', JSON.stringify(firstMeal));
      }
      if (idDrink) {
        const firstCocktail = { cocktails: { [idDrink]: [] }, meals: { } };
        localStorage.setItem('inProgressRecipes', JSON.stringify(firstCocktail));
      }
    }
    if (inProgressList !== null) {
      if (idMeal) {
        const anotherMeal = {
          cocktails: { ...inProgressList.cocktails },
          meals: { ...inProgressList.meals, [idMeal]: [] },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(anotherMeal));
      }
      if (idDrink) {
        const anotherCocktail = {
          cocktails: { ...inProgressList.cocktails, [idDrink]: [] },
          meals: { ...inProgressList.meals },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(anotherCocktail));
      }
    }
  };

  const copyContent = () => { copy(window.location.href); setCopied(true); };

  const createNewArray = () => {
    if (idMeal) {
      const objFood = [{ id: idMeal,
        type: 'food',
        nationality: recipe[0].strArea,
        category: recipe[0].strCategory,
        alcoholicOrNot: '',
        name: recipe[0].strMeal,
        image: recipe[0].strMealThumb }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(objFood));
    }
    if (idDrink) {
      const objDrink = [{ id: idDrink,
        type: 'drink',
        nationality: recipe[0].strArea ? recipe[0].strArea : '',
        category: recipe[0].strCategory,
        alcoholicOrNot: recipe[0].strAlcoholic,
        name: recipe[0].strDrink,
        image: recipe[0].strDrinkThumb }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(objDrink));
    }
  };

  const refreshTheArray = (favoritesList) => {
    if (idMeal) {
      const food = recipe[0];
      const objFood = [
        ...favoritesList,
        { id: idMeal,
          type: 'food',
          nationality: food.strArea,
          category: food.strCategory,
          alcoholicOrNot: '',
          name: food.strMeal,
          image: food.strMealThumb }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(objFood));
    }
    if (idDrink) {
      const drink = recipe[0];
      const objDrink = [
        ...favoritesList,
        { id: idDrink,
          type: 'drink',
          nationality: drink.strArea,
          category: drink.strCategory,
          alcoholicOrNot: drink.strAlcoholic,
          name: drink.strDrink,
          image: drink.strDrinkThumb }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(objDrink));
    }
  };

  const handleFavorite = () => {
    const favoritesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoritesList === null) { createNewArray(); }
    if (favoritesList !== null) { refreshTheArray(favoritesList); }
  };

  return (
    <section>
      { recipe.map((item, index) => (
        <div key={ index }>
          <h1 data-testid="recipe-title">
            { item.strMeal ? item.strMeal : item.strDrink }
          </h1>
          <h3 data-testid="recipe-category">
            {item.strAlcoholic ? item.strAlcoholic : item.strCategory}
          </h3>
          <img
            src={ item.strMealThumb ? item.strMealThumb : item.strDrinkThumb }
            alt={ item.strMeal ? item.strMeal : item.strDrink }
            width="300px"
            data-testid="recipe-photo"
          />
          { measures.map((_, i) => (
            <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
              { item[measures[i]] !== '' && item[measures[i]] }
              { ' ' }
              { item[ingredients[i]] !== '' && item[ingredients[i]] }
            </p>
          ))}
          <p data-testid="instructions">{item.strInstructions}</p>
          <iframe
            // Referência para inserir vídeo embedado: https://thewebdev.info/2021/10/02/how-to-embed-a-youtube-video-into-a-react-app/;
            width="1280"
            data-testid="video"
            height="720"
            src={ item.strYoutube }
            frameBorder="0"
            title={ item.strMeal ? item.strMeal : item.strDrink }
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
            allowFullScreen
          />
          <div>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ copyContent }
            >
              { (copied) ? 'Link copied!' : 'Share' }
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ handleFavorite }
            >
              Favorite
            </button>
          </div>
          <section className="carousel">
            {
              (((history.location.pathname.includes('foods') && drinks.drinks) || (
                history.location.pathname.includes('drinks') && foods.foods)) ? (
                  drinks.drinks.slice(0, num6).map((drink, id) => (
                    <div key={ id } data-testid={ `${id}-recomendation-card` }>
                      <p data-testid={ `${id}-recomendation-title` }>
                        {drink.strDrink}
                      </p>
                      <img
                        src={ drink.strDrinkThumb }
                        alt={ drink.strDrink }
                        className="img-carousel"
                      />
                    </div>
                  ))) : (
                  foods.meals.slice(0, num6).map((meal, id) => (
                    <div key={ id } data-testid={ `${id}-recomendation-card` }>
                      <p data-testid={ `${id}-recomendation-title` }>
                        {meal.strMeal}
                      </p>
                      <img
                        src={ meal.strMealThumb }
                        alt={ meal.strMeal }
                        className="img-carousel"
                      />
                    </div>
                  ))
                ))
            }
          </section>
          { isDone === false && (
            <div className="div-button">
              <Link to={ `${history.location.pathname}/in-progress` }>
                <button
                  type="button"
                  data-testid="start-recipe-btn"
                  className="start-recipe"
                  onClick={ saveThisProgress }
                >
                  { inProgress ? 'Continue Recipe' : 'Start Recipe' }
                </button>
              </Link>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

export default RecipeDetails;

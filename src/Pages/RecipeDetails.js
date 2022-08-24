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
  const [isDisabled, setisDisabled] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const { drinks, foods, copied, setCopied } = useContext(Context);
  const history = useHistory();
  const num6 = 6;

  const getFromLocal = () => {
    const inProgressList = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressList !== null) {
      let a = false;
      let b = false;
      if (inProgressList.cocktails !== null && inProgressList.cocktails !== undefined) {
        a = Object.keys(inProgressList.cocktails).includes(idDrink);
      }
      if (inProgressList.meals !== null && inProgressList.cocktails !== undefined) {
        b = Object.keys(inProgressList.meals).includes(idMeal);
      }
      if (a || b) {
        setInProgress(true);
      }
    }
  };

  useEffect(() => {
    getFromLocal();

    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));

    if (getLocalStorage !== null) {
      const checkID = getLocalStorage.some(({ id }) => id === idMeal || id === idDrink);
      if (checkID === true) {
        setisDisabled(true);
      }
    }
    if (idMeal) {
      const waitMeal = async () => {
        const result = await getMealRecipe(idMeal);
        setRecipe(result);
        setMeasures(Object.keys(result[0]).filter((e) => e.includes('strMeasure')));
        setIngredients(Object.keys(result[0]).filter((e) => e.includes('strIngredient')));
      };
      waitMeal();
    }

    if (idDrink) {
      const waitDrink = async () => {
        const result = await getDrinkRecipe(idDrink);
        setRecipe(result);
        setMeasures(Object.keys(result[0]).filter((e) => e.includes('strMeasure')));
        setIngredients(Object.keys(result[0]).filter((e) => e.includes('strIngredient')));
      };
      waitDrink();
    }
  }, [idDrink, idMeal]);

  const setInProgess = () => {
    const inProgressList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressList === null && idDrink) {
      const newBigObjCocktails = {
        // O array com as strings abaixo é só um teste, é necessério que esse array tenha outras infos específicas da receita (as infos são solicitadas pelo readme)
        cocktails: { [idDrink]: ['teste1', 'testinho1'] },
        meals: { },
      };
      const stringified = JSON.stringify(newBigObjCocktails);
      localStorage.setItem('inProgressRecipes', stringified);
    }
    if (inProgressList === null && idMeal) {
      const newBigObjMeals = {
        cocktails: { },
        // O array com as strings abaixo é só um teste, é necessério que esse array tenha outras infos específicas da receita (as infos são solicitadas pelo readme)
        meals: { [idMeal]: ['teste2', 'testinho2'] },
      };
      const stringified = JSON.stringify(newBigObjMeals);
      localStorage.setItem('inProgressRecipes', stringified);
    }
    if (inProgressList !== null && idDrink) {
      const bigObjCocktails = {
        // O array com as strings abaixo é só um teste, é necessério que esse array tenha outras infos específicas da receita (as infos são solicitadas pelo readme)
        cocktails: { ...inProgressList.cocktails, [idDrink]: ['teste3', 'testinho3'] },
        meals: { ...inProgressList.meals },
      };
      const stringified = JSON.stringify(bigObjCocktails);
      localStorage.setItem('inProgressRecipes', stringified);
    }
    if (inProgressList !== null && idMeal) {
      const bigObjMeals = {
        cocktails: { ...inProgressList.cocktails },
        // O array com as strings abaixo é só um teste, é necessério que esse array tenha outras infos específicas da receita (as infos são solicitadas pelo readme)
        meals: { ...inProgressList.meals, [idMeal]: ['teste4', 'testinho4'] },
      };
      const stringified = JSON.stringify(bigObjMeals);
      localStorage.setItem('inProgressRecipes', stringified);
    }
  };

  const copyContent = () => {
    copy(window.location.href);
    setCopied(true);
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
          <div>
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
                        <p
                          data-testid={ `${id}-recomendation-title` }
                        >
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
                        <p data-testid={ `${id}-recomendation-title` }>{meal.strMeal}</p>
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
          </div>
          <div className="div-button">
            <Link to={ `${history.location.pathname}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-recipe"
                disabled={ isDisabled }
                onClick={ setInProgess }
              >
                { inProgress ? 'Continue Recipe' : 'Continue Recipe' }
              </button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}

export default RecipeDetails;

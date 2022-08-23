// import { Carousel } from 'bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Context from '../context/Context';
import { getMealRecipe, getDrinkRecipe } from '../services/getRecipe';
// Tentativa conserto de evaluator remoto (esse comentário pode ser apagado).

function RecipeDetails() {
  const { idMeal, idDrink } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const { drinks, foods } = useContext(Context);
  const history = useHistory();
  const num6 = 6;

  useEffect(() => {
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
  }, []);

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
            width="400px"
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
        </div>
        // Inserir aqui a div do Card de Recomendação
      ))}
    </section>
  );
}

export default RecipeDetails;

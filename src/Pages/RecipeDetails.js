import React, { useEffect, useState } from 'react';
import { getMealRecipe, getDrinkRecipe } from '../services/getRecipe';

function RecipeDetails() {
  const [recipe, setRecipe] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    // Referência para capturar pathname da janela atual: https://www.w3schools.com/js/js_window_location.asp;
    // Referência para fatiar uma string: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/slice;
    const { pathname } = window.location;
    const baseRoute = pathname.slice(Number('1'), Number('6'));
    let id = '';

    if (baseRoute === 'foods') {
      id = pathname.slice(Number('7'));
      const waitMeal = async () => {
        const result = await getMealRecipe(id);
        setRecipe(result);
        setMeasures(Object.keys(result[0]).filter((e) => e.includes('strMeasure')));
        setIngredients(Object.keys(result[0]).filter((e) => e.includes('strIngredient')));
      };
      waitMeal();
    }

    if (baseRoute === 'drink') {
      id = pathname.slice(Number('8'));
      const waitDrink = async () => {
        const result = await getDrinkRecipe(id);
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
          <div data-testid="video">
            <iframe
            // Referência para inserir vídeo embedado: https://thewebdev.info/2021/10/02/how-to-embed-a-youtube-video-into-a-react-app/;
              width="1280"
              height="720"
              src={ item.strYoutube }
              frameBorder="0"
              title={ item.strMeal ? item.strMeal : item.strDrink }
              allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
              allowFullScreen
            />
          </div>
        </div>
        // Inserir aqui a div do Card de Recomendação
        // <div data-testid="${index}-recomendation-card">Card de Recomendação</div>
      ))}
    </section>
  );
}

export default RecipeDetails;

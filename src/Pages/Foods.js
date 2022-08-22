import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

function Foods() {
  const { foods } = useContext(Context);
  const num12 = 12;
  return (
    <div>
      <Header />
      {foods.meals
        && foods.meals.slice(0, num12).map((food, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              className="imgFoods"
              src={ food.strMealThumb }
              alt=""
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
          </div>
        ))}
      <Footer />
    </div>
  );
}

export default Foods;

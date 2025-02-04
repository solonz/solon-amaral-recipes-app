import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

function Foods() {
  const { foods, foodCategory,
    handleFood, resetFoodsFilter } = useContext(Context);
  const num12 = 12;
  const num5 = 5;
  return (
    <div>
      <Header />
      { foodCategory.meals
      && foodCategory.meals.slice(0, num5).map((category, id) => (
        <button
          key={ id }
          data-testid={ `${category.strCategory}-category-filter` }
          type="button"
          onClick={ () => { handleFood(category.strCategory); } }
        >
          {category.strCategory}

        </button>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ resetFoodsFilter }
      >
        All
      </button>
      { foods.meals
        && foods.meals.slice(0, num12).map((food, index) => (
          <Link to={ `/foods/${food.idMeal}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                className="imgFoods"
                src={ food.strMealThumb }
                alt=""
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
            </div>
          </Link>
        ))}
      <Footer />
    </div>
  );
}

export default Foods;

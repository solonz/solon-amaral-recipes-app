import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

function Drinks() {
  const { drinks, drinkCategory,
    resetDrinksFilter, handleDrink } = useContext(Context);
  const num12 = 12;
  const num5 = 5;
  return (
    <div>
      <Header />
      { drinkCategory.drinks
      && drinkCategory.drinks.slice(0, num5).map((category, id) => (
        <button
          key={ id }
          data-testid={ `${category.strCategory}-category-filter` }
          type="button"
          onClick={ () => handleDrink(category.strCategory) }
        >
          {category.strCategory}

        </button>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ resetDrinksFilter }
      >
        All
      </button>
      { drinks.drinks
        && drinks.drinks.slice(0, num12).map((drink, index) => (
          <Link
            to={ `/drinks/${drink.idDrink}` }
            key={ index }
          >
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ drink.strDrinkThumb }
                alt=""
                className="imgDrinks"
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            </div>
          </Link>
        ))}
      <Footer />
    </div>
  );
}

export default Drinks;

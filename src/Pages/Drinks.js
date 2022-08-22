import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

function Drinks() {
  const { drinks, loading, drinkCategory,
    drinkByCategory, resetDrinksFilter } = useContext(Context);
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
          onClick={ () => drinkByCategory(category.strCategory) }
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
      {loading ? 'Carregando...'
        : drinks.drinks
        && drinks.drinks.slice(0, num12).map((drink, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ drink.strDrinkThumb }
              alt=""
              className="img"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          </div>
        ))}
      <Footer />
    </div>
  );
}

export default Drinks;

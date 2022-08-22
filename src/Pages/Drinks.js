import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

function Drinks() {
  const { drinks } = useContext(Context);
  const num12 = 12;
  return (
    <div>
      <Header />
      {drinks.drinks
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

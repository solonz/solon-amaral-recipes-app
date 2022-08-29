import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(favoriteList);
  }, []);

  return (
    <div>
      <Header />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      { favorites && favorites.map((e, index) => (
        <section key={ index }>
          <img src={ e.image } alt="" data-testid={ `${index}-horizontal-image` } />
          <h3 data-testid={ `${index}-horizontal-name` }>{ e.name }</h3>
          <h5 data-testid={ `${index}-horizontal-top-text` }>
            { e.nationality && <span>{`${e.nationality} - `}</span> }
            { e.category && <span>{e.category}</span> }
            { e.alcoholicOrNot && <h5>{ e.alcoholicOrNot }</h5>}
          </h5>
          <div>
            <button type="button">
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt=""
              />
            </button>
            <button type="button">
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt=""
              />
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}

export default FavoriteRecipes;

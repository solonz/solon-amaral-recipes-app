import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
    const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(favoriteList);
  }, []);

  const copyContent = (item) => {
    setCopied(true);
    if (item.type === 'food') { copy(`http://localhost:3000/foods/${item.id}`); }
    if (item.type === 'drink') { copy(`http://localhost:3000/drinks/${item.id}`); }
  };

  const removeFavorite = (item) => {
    const favoritesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const arrayAfterRemoved = favoritesList.filter(({ id }) => id !== item.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrayAfterRemoved));
    setFavorites(arrayAfterRemoved);
  };

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
            <h6>{ copied && 'Link copied!' }</h6>
            <button type="button" onClick={ () => copyContent(e) }>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt=""
              />
            </button>
            <button type="button" onClick={ () => removeFavorite(e) }>
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

import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchTopBtn from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const history = useHistory();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  const route = location.pathname.substring(1);
  const hifen = '-';
  const favoriteRecipes = 'Favorite recipes';
  const doneRecipes = 'Done recipes';
  // referência: https://bit.ly/3AbLHQ3
  const pageTitle = (route[0].toUpperCase() + route.substring(1)).replace(hifen, ' ');

  function handleClick() {
    setShowSearch(!showSearch);
  }

  return (
    <div>

      <h1 data-testid="page-title">
        {(pageTitle !== favoriteRecipes && pageTitle !== doneRecipes) && pageTitle}
        {' '}
        {(pageTitle === favoriteRecipes) && 'Favorite Recipes'}
        {(pageTitle === doneRecipes) && 'Done Recipes'}

      </h1>
      {pageTitle === 'Foods' || pageTitle === 'Drinks' ? (
        <div>
          <button type="button" onClick={ () => history.push('/profile') }>
            <img src={ profileIcon } alt=" " data-testid="profile-top-btn" />
          </button>
          <button type="button" onClick={ handleClick } className="btn-2">
            <img src={ searchTopBtn } alt=" " data-testid="search-top-btn" />
          </button>
        </div>)
        : (
          <button type="button" onClick={ () => history.push('/profile') }>
            <img src={ profileIcon } alt=" " data-testid="profile-top-btn" />
          </button>
        )}

      {showSearch && <SearchBar />}
    </div>
  );
}

export default Header;

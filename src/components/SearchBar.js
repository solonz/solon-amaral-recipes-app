import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getFoodWithIngredient, getDrinkWithIngredient, getFoodWithName, getDrinkWithName,
  getFoodWithFirstLetter, getDrinkWithFirstLetter } from '../services/getFoodIngredient';
import Context from '../context/Context';

function SearchBar() {
  const history = useHistory();
  const { setDrinks, setFoods } = useContext(Context);
  const [searchInput, setSearchInput] = useState('');
  const [radio, setRadio] = useState('');
  let foodResult = [];
  let drinkResult = [];
  const firstLetter = 'First letter';
  const route = history.location.pathname;

  const handleChange = ({ target: { value } }) => {
    setSearchInput(value);
  };

  function handleIngredient() {
    setRadio('ingredient');
  }

  function handleName() {
    setRadio('name');
  }

  function handleFirstLetter() {
    setRadio(firstLetter);
  }

  const searchIngredient = async () => {
    if (route === '/foods') {
      foodResult = await getFoodWithIngredient(searchInput);
      setFoods(foodResult);
      return;
    }
    drinkResult = await getDrinkWithIngredient(searchInput);
    setDrinks(drinkResult);
  };

  const searchName = async () => {
    if (route === '/foods') {
      foodResult = await getFoodWithName(searchInput);
      setFoods(foodResult);
      return;
    }
    drinkResult = await getDrinkWithName(searchInput);
    setDrinks(drinkResult);
  };

  const searchFirstLetter = async () => {
    if (route === '/foods') {
      foodResult = await getFoodWithFirstLetter(searchInput);
      setFoods(foodResult);
      return;
    }
    drinkResult = await getDrinkWithFirstLetter(searchInput);
    setDrinks(drinkResult);
  };

  const showDrinks = () => {
    if (drinkResult.drinks.length === 1) {
      history.push(`/drinks/${drinkResult.drinks[0].idDrink}`);
    }
  };

  const showFoods = () => {
    if (foodResult.meals.length === 1) {
      history.push(`/foods/${foodResult.meals[0].idMeal}`);
    }
  };

  async function handleSearchButton() {
    if (searchInput.length > 1 && radio === firstLetter) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (radio === 'ingredient') {
      await searchIngredient();
    }
    if (radio === 'name') {
      await searchName();
    }
    if (radio === firstLetter) {
      await searchFirstLetter();
    }
    if (foodResult.meals === null || drinkResult.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    if (drinkResult.drinks) {
      showDrinks();
    }
    if (foodResult.meals) {
      showFoods();
    }
    if (searchInput.length > 0 && radio === firstLetter) {
      global.alert('Your search must have only 1 (one) character');
    }
  }

  return (
    <div>
      <form>
        <input
          type="text"
          data-testid="search-input"
          placeholder="search"
          onChange={ handleChange }
        />

        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onClick={ handleIngredient }
          />
        </label>

        <label htmlFor="name">
          Name
          <input
            type="radio"
            value="name"
            data-testid="name-search-radio"
            onClick={ handleName }
          />
        </label>

        <label htmlFor="first letter">
          First letter
          <input
            type="radio"
            value="first letter"
            data-testid="first-letter-search-radio"
            onClick={ handleFirstLetter }
          />
        </label>

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearchButton }
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [foods, setFoods] = useState('');
  const [newFoods, setNewFoods] = useState([]);
  const [drinks, setDrinks] = useState('');
  const [newDrinks, setNewDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [foodCategory, setFoodCategory] = useState([]);
  const [drinkCategory, setDrinkCategory] = useState([]);
  const [filter, setFilter] = useState(false);
  const [copied, setCopied] = useState(false);

  const foodAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setFoods(data);
      setNewFoods(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const drinkAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setDrinks(data);
      setNewDrinks(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const foodCategoryAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setFoodCategory(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const drinkCategoryAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setDrinkCategory(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const foodByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      if (filter) {
        setFoods(newFoods);
      } else {
        setFoods(data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setFilter(!filter);
  };

  const handleFood = (category) => {
    setFilter(!filter);
    foodByCategory(category);
  };

  const drinkByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      if (filter) {
        setDrinks(newDrinks);
      } else {
        setDrinks(data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setFilter(!filter);
  };

  const handleDrink = (category) => {
    setFilter(!filter);
    drinkByCategory(category);
  };

  const resetFoodsFilter = () => {
    setFoods(newFoods);
  };

  const resetDrinksFilter = () => {
    setDrinks(newDrinks);
  };

  useEffect(() => {
    foodAPI();
    drinkAPI();
    foodCategoryAPI();
    drinkCategoryAPI();
  }, []);

  const contextValue = {
    foods,
    newFoods,
    setFoods,
    drinks,
    setDrinks,
    loading,
    setLoading,
    foodCategory,
    drinkCategory,
    setDrinkCategory,
    foodByCategory,
    drinkByCategory,
    resetFoodsFilter,
    resetDrinksFilter,
    filter,
    setFilter,
    handleFood,
    handleDrink,
    copied,
    setCopied,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [foods, setFoods] = useState('');
  const [drinks, setDrinks] = useState('');
  const [loading, setLoading] = useState(true);

  const contextValue = {
    foods,
    setFoods,
    drinks,
    setDrinks,
    loading,
  };

  const foodAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setFoods(data);
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
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    foodAPI();
    drinkAPI();
  }, []);

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

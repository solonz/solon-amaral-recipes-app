import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [foods, setFoods] = useState('');
  const [drinks, setDrinks] = useState('');

  const contextValue = {
    foods,
    setFoods,
    drinks,
    setDrinks,
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

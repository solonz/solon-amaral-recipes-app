import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { useParams } from 'react-router-dom';

function CheckBox({ item, index }) {
  const [check, setCheck] = useState(false);

  // const { idMeal, idDrink } = useParams();

  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <label htmlFor={ item } data-testid={ `${index}-ingredient-step` }>
      <input
        type="checkbox"
        id={ item }
        name={ item }
        checked={ check }
        onChange={ handleCheck }
      />
      {' '}
      {check ? <s>{item}</s> : item }
    </label>
  );
}

CheckBox.propTypes = {
  item: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CheckBox;

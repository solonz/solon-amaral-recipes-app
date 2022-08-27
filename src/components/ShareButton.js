import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ index, recipe }) {
  const [showMsg, setShowMsg] = useState(false);
  const msgCopied = 'Link copied!';

  const handleClick = (recipeProps) => {
    if (recipeProps.type === 'food') {
      clipboardCopy(`http://localhost:3000/foods/${recipeProps.id}`);
      setShowMsg(!showMsg);
      return;
    }
    if (recipeProps.type === 'drink') {
      clipboardCopy(`http://localhost:3000/drinks/${recipeProps.id}`);
      setShowMsg(!showMsg);
    }
  };

  return (
    <div>
      <div key={ index }>
        <button
          type="button"
          onClick={ () => handleClick(recipe) }
        >
          <img
            src={ shareIcon }
            alt=" "
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <span>{showMsg && <span>{msgCopied}</span>}</span>
      </div>
    </div>
  );
}

ShareButton.propTypes = {
  index: PropTypes.string.isRequired,
  recipe: PropTypes.string.isRequired,
};

export default ShareButton;

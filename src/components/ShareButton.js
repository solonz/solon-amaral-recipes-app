import React, { useState, useContext } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';

function ShareButton({ index }) {
  const [showMsg, setShowMsg] = useState('false');
  const msgCopied = 'Link copied!';
  const { doneRecipesState } = useContext(Context);

  const handleClick = (recipe) => {
    if (recipe.type === 'food') {
      clipboardCopy(`http://localhost:3000/foods/${recipe.id}`);
      setShowMsg(!showMsg);
      return;
    }
    if (recipe.type === 'drink') {
      clipboardCopy(`http://localhost:3000/drinks/${recipe.id}`);
      setShowMsg(!showMsg);
    }
  };

  console.log(showMsg);

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

export default ShareButton;

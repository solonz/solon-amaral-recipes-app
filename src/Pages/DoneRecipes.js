import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [showButton, setShowButton] = useState('true');
  // const [ids, setIds] = useState([]);
  const [showFoods, setShowFoods] = useState('false');
  const [showDrinks, setShowDrinks] = useState('false');
  const [showAll, setShowAll] = useState('true');
  const [showMsg, setShowMsg] = useState('false');

  const msgCopied = 'Link copied!';

  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  // useEffect(() => {
  //   setIds(doneRecipes.map((ele) => ele.id));
  // }, []);

  const handleClick = (recipe) => {
    if (recipe.type === 'food') {
      clipboardCopy(`http://localhost:3000/foods/${recipe.id}`);
      // if (doneRecipes.includes('recipe.id')) {
      //   setShowButton(recipe.id);
      // }
      // recipe.id
      // setShowButton(false);

      setShowMsg(!showMsg);
      return;
    }
    if (recipe.type === 'drink') {
      clipboardCopy(`http://localhost:3000/drinks/${recipe.id}`);
      setShowButton(false);
    }
  };

  const handleClickAll = () => {
    setShowFoods('false');
    setShowAll('true');
    setShowDrinks('false');
  };

  const handleClickFoods = () => {
    setShowFoods('true');
    setShowAll('false');
    setShowDrinks('false');
  };

  const handleClickDrinks = () => {
    setShowDrinks('true');
    setShowFoods('false');
    setShowAll('false');
  };

  // console.log(ids);

  return (
    <div>
      <Header />
      <div className="wrapper">
        <button
          className="button"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClickAll }
        >
          All
        </button>
        <button
          className="button"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClickFoods }
        >
          Food
        </button>
        <button
          className="button"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClickDrinks }
        >
          Drinks
        </button>
      </div>
      {(showAll && showFoods === 'false' && showDrinks === 'false')
      && (doneRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link
            to={ recipe.type === 'food' ? (`/foods/${recipe.id}`)
              : (`/drinks/${recipe.id}`) }
          >
            <img
              className="imgFoods"
              src={ recipe.image }
              alt=""
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          {recipe.type === 'food' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}
            </p>)
            : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.alcoholicOrNot}`}
              </p>
            )}
          <Link
            to={ recipe.type === 'food' ? (`/foods/${recipe.id}`)
              : (`/drinks/${recipe.id}`) }
          >
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.tags.map((ele) => (
            <p key={ ele } data-testid={ `${index}-${ele}-horizontal-tag` }>{ele}</p>
          ))}

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
          {!showMsg && (<span>{msgCopied}</span>)}
        </div>
      )))}

      {(showFoods && showAll === 'false' && showDrinks === 'false')
      && doneRecipes.filter((ele) => ele.type === 'food').map((recipe, index) => (
        <div key={ recipe.name }>
          <Link to={ (`/foods/${recipe.id}`) }>
            <img
              className="imgFoods"
              src={ recipe.image }
              alt=""
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.nationality} - ${recipe.category}`}
          </p>

          <Link to={ (`/foods/${recipe.id}`) }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.tags.map((ele) => (
            <p key={ ele } data-testid={ `${index}-${ele}-horizontal-tag` }>{ele}</p>
          ))}
          { showButton ? (
            <button
              type="button"
              onClick={ () => handleClick(recipe) }
            >
              <img
                src={ shareIcon }
                alt=" "
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>)
            : (
              <span>{msgCopied}</span>
            )}
        </div>
      ))}

      {(showDrinks && showAll === 'false' && showFoods === 'false')
      && doneRecipes.filter((ele) => ele.type === 'drink').map((recipe, index) => (
        <div key={ recipe.name }>
          <Link to={ (`/drinks/${recipe.id}`) }>
            <img
              className="imgFoods"
              src={ recipe.image }
              alt=""
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.alcoholicOrNot}`}
          </p>

          <Link to={ (`/drinks/${recipe.id}`) }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.tags.map((ele) => (
            <p key={ ele } data-testid={ `${index}-${ele}-horizontal-tag` }>{ele}</p>
          ))}
          { showButton ? (
            <button
              type="button"
              onClick={ () => handleClick(recipe) }
            >
              <img
                src={ shareIcon }
                alt=" "
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>)
            : (
              <span>{msgCopied}</span>
            )}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;

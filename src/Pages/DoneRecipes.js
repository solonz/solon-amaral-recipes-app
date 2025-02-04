import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

function DoneRecipes() {
  const [showFoods, setShowFoods] = useState(false);
  const [showDrinks, setShowDrinks] = useState(false);
  const [showAll, setShowAll] = useState(true);

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

  const handleClickAll = () => {
    setShowFoods(false);
    setShowAll(true);
    setShowDrinks(false);
  };

  const handleClickFoods = () => {
    setShowFoods(true);
    setShowAll(false);
    setShowDrinks(false);
  };

  const handleClickDrinks = () => {
    setShowDrinks(true);
    setShowFoods(false);
    setShowAll(false);
  };

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
      {showAll
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
          <ShareButton index={ index } recipe={ recipe } />
        </div>
      )))}

      {showFoods
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
          <ShareButton index={ index } recipe={ recipe } />
        </div>
      ))}

      {showDrinks
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
          <ShareButton index={ index } recipe={ recipe } />
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;

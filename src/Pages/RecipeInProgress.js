import React from 'react';
import { useParams } from 'react-router-dom';

function RecipeInProgress() {
  const { idMeal, idDrink } = useParams();

  const setDone = () => {
    const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesList === null) {
      if (idDrink) {
        const arrayNew = [{
          id: idDrink,
          type: 'drink',
          nationality: 'nacionalidade-da-receita-ou-texto-vazio',
          category: 'categoria-da-receita-ou-texto-vazio',
          alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
          name: 'nome-da-receita',
          image: 'imagem-da-receita',
          doneDate: 'quando-a-receita-foi-concluida',
          tags: 'array-de-tags-da-receita-ou-array-vazio',
        }];
        const stringified = JSON.stringify(arrayNew);
        localStorage.setItem('doneRecipes', stringified);
      }
      if (idMeal) {
        const arrayNew = [{
          id: idMeal,
          type: 'food',
          nationality: 'nacionalidade-da-receita-ou-texto-vazio',
          category: 'categoria-da-receita-ou-texto-vazio',
          alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
          name: 'nome-da-receita',
          image: 'imagem-da-receita',
          doneDate: 'quando-a-receita-foi-concluida',
          tags: 'array-de-tags-da-receita-ou-array-vazio',
        }];
        const stringified = JSON.stringify(arrayNew);
        localStorage.setItem('doneRecipes', stringified);
      }
    }
    if (doneRecipesList !== null) {
      if (idDrink) {
        const arrayRefresh = [
          ...doneRecipesList,
          { id: idDrink, type: 'food' }];
        const stringified = JSON.stringify(arrayRefresh);
        localStorage.setItem('doneRecipes', stringified);
      }
      if (idMeal) {
        const arrayRefresh = [
          ...doneRecipesList,
          // abaixo é necessário ter todas as chaves igual ao array da linha 10, só deixei assim por enquanto pra testar o armazenamento no localStorage
          { id: idMeal, type: 'food' }];
        const stringified = JSON.stringify(arrayRefresh);
        localStorage.setItem('doneRecipes', stringified);
      }
    }
  };

  return (
    <div>
      <h1>In Progress</h1>
      <button type="button" onClick={ setDone } data-testid="finish-recipe-btn">
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;

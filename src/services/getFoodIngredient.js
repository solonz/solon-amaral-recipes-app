export async function getFoodWithIngredient(ingredient) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getFoodWithName(foodName) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getFoodWithFirstLetter(letra) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letra}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getDrinkWithIngredient(ingredient) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getDrinkWithName(drinkName) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getDrinkWithFirstLetter(letra) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

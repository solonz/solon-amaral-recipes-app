import React from 'react';
import { useParams } from 'react-router-dom';

function Details() {
  const { idMeal } = useParams();
  return (
    <div>
      {console.log(idMeal)}
      <h1>Detalhes</h1>
    </div>
  );
}

export default Details;

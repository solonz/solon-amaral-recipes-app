import React from 'react';
import { useHistory } from 'react-router-dom';
import Drinks from '../Pages/Drinks';
import Foods from '../Pages/Foods';

function Recipes() {
  const history = useHistory();
  return (
    <div>
      { (history.location.pathname === '/drinks') ? <Drinks />
        : <Foods /> }
    </div>
  );
}

export default Recipes;

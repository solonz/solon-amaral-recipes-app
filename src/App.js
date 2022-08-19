import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';
import Foods from './Pages/Foods';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

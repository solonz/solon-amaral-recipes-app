import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const MAGIC_SIX = 6;

function Login() {
  const [email, setChangeEmail] = useState('');
  const [password, setChangePass] = useState('');
  const [loginButton, setLoginButton] = useState(true);
  const [redirectFoods, setRedirectFoods] = useState(false);

  useEffect(() => {
    const validEmail = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const validPassword = password.length > MAGIC_SIX;
    if (validEmail && validPassword) {
      setLoginButton(false);
    } else {
      setLoginButton(true);
    }
  }, [email, password]);

  const saveOnLocalStorage = () => {
    setRedirectFoods(true);
    const userData = JSON.stringify({ email });
    localStorage.setItem('user', userData);
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  };

  return (
    <div>
      {redirectFoods && <Redirect to="/foods" />}
      <form>
        <input
          type="email"
          data-testid="email-input"
          placeholder="email"
          onChange={ (e) => setChangeEmail(e.target.value) }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="senha"
          onChange={ (e) => setChangePass(e.target.value) }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ loginButton }
          onClick={ () => saveOnLocalStorage() }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;

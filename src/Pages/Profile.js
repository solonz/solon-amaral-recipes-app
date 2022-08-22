import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  function getEmail() {
    const emailStorage = JSON.parse(localStorage.getItem('user'));
    setEmail(emailStorage);
  }

  useEffect(() => {
    getEmail();
  }, []);

  function handleClickDoneRecipes() {
    history.push('/done-recipes');
  }

  function handleClickFavoriteRecipes() {
    history.push('/favorite-recipes');
  }

  function handleClickLogin() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header />
      <p data-testid="profile-email">
        {email && <span>{email.email}</span>}
        {' '}

      </p>
      <form>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ handleClickDoneRecipes }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ handleClickFavoriteRecipes }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClickLogin }
        >
          Logout
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default Profile;

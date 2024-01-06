import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import img1 from '../images/profileIcon.svg';
import Form from './Form';
import SearchBar from './SearchBar/SearchBar';
import Recipes from './recipes/Recipes';
import DoneRecipes from './DoneRecipes/DoneRecipes';

export default function Header() {
  const [local, setLocal] = useState('teste');
  const [csw, setCsw] = useState(true);
  const [toogle, setToogle] = useState<boolean>(false);
  const [recipes, setRecipes] = useState(false);
  // const [profile, setProfile] = useState(false);
  const [done, setDone] = useState(false);
  // const [favorite, setFavorite] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/drinks') {
      setRecipes(true);
      return setLocal('Drinks');
    }
    if (location.pathname === '/meals') {
      setRecipes(true);
      return setLocal('Meals');
    }
    if (location.pathname === '/profile') {
      setCsw(false);
      // setProfile(true);
      return setLocal('Profile');
    }
    if (location.pathname === '/done-recipes') {
      setCsw(false);
      setDone(true);
      return setLocal('Done Recipes');
    }
    if (location.pathname === '/favorite-recipes') {
      setCsw(false);
      // setFavorite(true);
      return setLocal('Favorite Recipes');
    }
  }, [location]);

  return (
    <div>
      <header>
        <button onClick={ () => navigate('/profile') } data-testid="btn">

          <img data-testid="profile-top-btn" src={ img1 } alt="profileIcon" />
        </button>

        {
        csw
          ? <Form
              setToogle={ setToogle }
              toogle={ toogle }
              setRecipes={ setRecipes }
              recepes={ recipes }
          />
          : <div />

        }
        {toogle && <SearchBar pageTitle={ local } />}
        {recipes && <Recipes /> }
        {done && <DoneRecipes />}
        {/* {profile && <Profile />} */}
        {/* {favorites && <Favorite />} */}

        <h1 data-testid="page-title">{local}</h1>
      </header>
    </div>
  );
}

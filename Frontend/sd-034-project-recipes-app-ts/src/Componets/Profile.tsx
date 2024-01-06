import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

const { localStorage } = window;
export default function Profile() {
  const navigate = useNavigate();
  // const [valorInput, setValorInput] = useState('');
  // const handleInputChange = (event: any) => {
  //   setValorInput(event.target.value);
  // };

  const usuarioJSON = localStorage.getItem('user');
  let emailUser;
  if (usuarioJSON !== null) {
    const usuario = JSON.parse(usuarioJSON);
    emailUser = usuario;
  } else {
    emailUser = false;
  }
  function LogoutButton() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <div>
      <h3 data-testid="profile-email">
        { emailUser.email }
      </h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => navigate('/done-recipes') }
      >
        Done Recipes

      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => navigate('/favorite-recipes') }
      >
        Favorite Recipes

      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => LogoutButton() }
      >
        Logout

      </button>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

function Header() {
  const [userName, setUserNames] = useState<any>('');
  const [load, setLoad] = useState(true);
  console.log(userName);

  async function targetName() {
    setLoad(true);
    const user = await getUser();
    setUserNames(user.name);
    setLoad(false);
  }

  useEffect(() => {
    targetName();
  }, []);

  return (
    <header data-testid="header-component">
      <nav>

        <NavLink to="/search" data-testid="link-to-search">
          Search
        </NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">
          Favorites
        </NavLink>

        <NavLink to="/profile" data-testid="link-to-profile">
          Profile
        </NavLink>

      </nav>
      {load === true ? (<Loading />)
        : (
          <div data-testid="header-user-name">{userName}</div>

        )}
    </header>
  );
}
export default Header;

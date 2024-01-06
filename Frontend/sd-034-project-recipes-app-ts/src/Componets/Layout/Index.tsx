import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';

import NavBar from '../Header';

function Layout() {
  return (
    <div className="wrapper">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;

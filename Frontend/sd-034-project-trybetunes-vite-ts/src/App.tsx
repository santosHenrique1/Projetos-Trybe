import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

import Search from './componetens/Search';
import Album from './componetens/Album';
import NotFound from './pages/NotFound';
import Layout from './componetens/Layout';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route path="/search" element={ <Search /> } />
          <Route path="/album/:id" element={ <Album /> } />
        </Route>
        <Route index element={ <Login /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </div>
  );
}

export default App;

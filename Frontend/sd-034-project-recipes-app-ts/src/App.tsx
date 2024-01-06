import { Route, Routes } from 'react-router-dom';
import './App.css';
import Drinks from './Componets/Drinks';
import Layout from './Componets/Layout/Index';
import Login from './Componets/Login';
import RecipeInProgress from './Componets/RecipeInProgress';
import RecipeDetails from './Componets/RecipeDetails';
import Meals from './Componets/Meals';
import Profile from './Componets/Profile';
// import DoneRecipes from './Componets/DoneRecipes/DoneRecipes';

function App() {
  return (
    <div className="meals">
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/" element={ <Layout /> }>
          <Route path="/meals" element={ <Meals /> } />
          <Route path="/drinks" element={ <Drinks /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/done-recipes" />
          <Route path="/favorite-recipes" />
        </Route>
        <Route
          path="/meals/:id"
          element={ <RecipeDetails /> }
        />
        <Route
          path="/drinks/:id"
          element={ <RecipeDetails /> }
        />
        <Route
          path="/meals/:id/in-progress"
          element={ <RecipeInProgress /> }
        />
        <Route
          path="/drinks/:id/in-progress"
          element={ <RecipeInProgress /> }
        />
      </Routes>
    </div>
  );
}

export default App;

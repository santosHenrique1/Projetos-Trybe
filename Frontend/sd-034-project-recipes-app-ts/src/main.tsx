import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { RecipesProvider } from './Context/RecipesProvider';
import './index.css';
import App from './App';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <RecipesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecipesProvider>,
  );

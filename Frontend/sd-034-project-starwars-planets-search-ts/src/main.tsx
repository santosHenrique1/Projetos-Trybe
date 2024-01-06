import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ApiDataProvider from './context/apiDataProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <ApiDataProvider>
      <App />
    </ApiDataProvider>,
  );

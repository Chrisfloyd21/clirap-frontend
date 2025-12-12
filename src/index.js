import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css'; // Décommentez si vous avez un fichier CSS
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap
import { ContextProvider } from './context/ContextProvider'; // L'import CRUCIAL

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* C'est ici que la magie opère. Tout l'App doit être dans le ContextProvider */}
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
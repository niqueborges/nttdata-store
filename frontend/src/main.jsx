import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Importa o CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa o CSS customizado (se criar um arquivo style.css)
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


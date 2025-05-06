// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Make sure Tailwind is imported here
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter  future={{ v7_relativeSplatPath: true , v7_startTransition: true  }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

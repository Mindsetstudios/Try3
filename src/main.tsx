import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Remove the initialization since we disabled RLS
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
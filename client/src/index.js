import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './styles/index.css';

createRoot(
  document.getElementById('root')
).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)
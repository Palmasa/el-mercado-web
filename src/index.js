import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import { UserContextProvider } from './contexts/UserContext';
import { ZipContextProvider } from './contexts/ZipContext';
import { CartContextProvider } from './contexts/CartContext';
import { SuppContextProvider } from './contexts/SuppContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <ZipContextProvider>
          <CartContextProvider>
            <SuppContextProvider>
              <App />
            </SuppContextProvider>
          </CartContextProvider>
        </ZipContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
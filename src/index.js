import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import {Toaster} from "react-hot-toast";

const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> 
        <App />
        <Toaster/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


//............React.strictMode...................
// React.StrictMode is a special tool in React that helps developers catch potential problems in their code.
//  It doesn't affect the functionality of your app—it just runs extra checks and warnings during development 
//  to make sure everything is following best practices.

//ex:It warns you if you're using old, outdated React functions that might be removed in future versions.

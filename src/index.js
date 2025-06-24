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

//...........provider...................
// Redux is used for state management, meaning it keeps track of data that
//  multiple components might need. But React components don’t automatically
//   know about Redux—Provider makes sure that every component inside it can access the store.
// Think of Provider as a bridge between your React app and the Redux store.

// Once you've set up the Provider, any component inside your app can connect to the Redux store and 
// retrieve or modify data. Without Provider, your components wouldn’t know Redux exists!


//............React.strictMode...................
// React.StrictMode is a special tool in React that helps developers catch potential problems in their code.
//  It doesn't affect the functionality of your app—it just runs extra checks and warnings during development 
//  to make sure everything is following best practices.

//ex:It warns you if you're using old, outdated React functions that might be removed in future versions.
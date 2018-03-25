import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
 // eslint-disable-next-line
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

//Middleware 
 // eslint-disable-next-line
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

// main routes
import Routes from './routes';

import reducers from './store/reducers';

// styles
import './style/style.css';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));


ReactDOM.render(
  <Provider store={store}>
      <Routes />
    </Provider>
    , document.querySelector('#root'));
registerServiceWorker();

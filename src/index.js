import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//Middleware - promise
import ReduxPromise from 'redux-promise';

// main routes
import Routes from './routes';

import reducers from './reducers';

// styles
import './style/style.css';

import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Routes />
    </Provider>
    , document.querySelector('#root'));
registerServiceWorker();

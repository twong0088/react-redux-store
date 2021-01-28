import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import allReducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from './config/firebaseConfig.js';
// import { createFirestoreInstance } from 'redux-firestore';

const store = createStore(allReducers, applyMiddleware(thunk.withExtraArgument({getFirebase})));

const rrfprops = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  // createFirestoreInstance
}
// const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
<Provider store={store}>
  <ReactReduxFirebaseProvider {...rrfprops}>
    <App />
  </ReactReduxFirebaseProvider>
</Provider>
, document.getElementById('app'));
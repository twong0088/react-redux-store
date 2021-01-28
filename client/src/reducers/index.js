import pageReducer from './page.js';
import emailErrReducer from './emailError.js';
import passErrReducer from './passwordError.js';
import cartReducer from './cart.js';
import productReducer from './products.js';
import subtotalReducer from './subtotal.js';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

const allReducers = combineReducers({
  page: pageReducer,
  firebase: firebaseReducer,
  emailErr: emailErrReducer,
  passErr: passErrReducer,
  cart: cartReducer,
  products: productReducer,
  subtotal: subtotalReducer
});

export default allReducers;

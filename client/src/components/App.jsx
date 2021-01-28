import React, { useState } from "react";
import Login from './login.jsx';
import Products from './products.jsx';
import Checkout from './checkout.jsx'
import { useSelector } from 'react-redux';
const App = () => {
  const page = useSelector(state => state.page);
  if (page === 'login') {
    return (
      <Login />
    );
  } else if (page === 'products') {
    return (
      <Products />
    );
  } else if (page === 'checkout') {
    return (
      <Checkout />
    );
  }
}

export default App;
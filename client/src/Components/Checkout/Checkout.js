import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';


function Checkout() {
  const cart = useSelector(state => state.cart);

  return (
    <div>
        <h1>Checkout</h1>
        <h2>Approximate time: 15m</h2>
        <h2>Nicolaia</h2>
    </div>
  )
}

export default Checkout
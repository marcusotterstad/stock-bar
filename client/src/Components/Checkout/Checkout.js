import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Cart from '../Cart/Cart';

const Checkout = () => {
  const [tableNo, setTableNo] = useState('');
  const cart = useSelector(state => state.cart);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const drinks = Object.keys(cart).reduce((acc, key) => {
      return { ...acc, [key]: cart[key].quantity };
    }, {});

    try {
      const response = await fetch('http://localhost:3000/order/new-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          table_no: tableNo,
          drinks: drinks,
        }),
      });

      if (response.status === 201) {
        console.log('Order placed successfully');
      } else {
        throw new Error('Error in placing order');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTableNoChange = (event) => {
    setTableNo(event.target.value);
  };

  return (
    <div>
      <Cart checkout = {true} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="tableNo">Table Number:</label>
        <input
          type="number"
          id="tableNo"
          name="tableNo"
          value={tableNo}
          min="1"
          onChange={handleTableNoChange}
          required
        /><br /><br />
        <button type="submit">Checkout</button>
      </form>
    </div>
  );
};

export default Checkout;

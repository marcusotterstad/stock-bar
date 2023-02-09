import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {addItem, removeItem} from '../../store/cartSlice';



function CartRow({id, name, quantity}) {
  const [price, setPrice] = useState();

  useEffect(() => {
    const fetchData = async () => {
        await fetch(`http://localhost:3000/menu/${id}/price`)
    .then((response) => response.json())
    .then((response) => {setPrice(response.price)});
    }
    fetchData();
  }, []);

  const dispatch = useDispatch();

  const handleAdd = () => {
      const item = {id: id, name: name};
      dispatch(addItem({item}));
    }

    const handleRemove = () => {
      dispatch(removeItem({id}));
    }

  return (
    <tr key={id}>
            <td><Link to={`/menu/${id}`}>{name}</Link></td>
            <td>{price*quantity}</td>
        <td><button onClick={handleAdd}>+</button>{quantity}<button onClick={handleRemove}>-</button></td>
    </tr>
  )
}

export default CartRow
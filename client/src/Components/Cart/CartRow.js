import React from 'react';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {addItem, removeItem} from '../../store/cartSlice';



function Cart({id, name, quantity}) {
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
        <td><button onClick={handleAdd}>+</button>{quantity}<button onClick={handleRemove}>-</button></td>
    </tr>
  )
}

export default Cart
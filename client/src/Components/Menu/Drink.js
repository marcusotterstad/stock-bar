import React from 'react';
import { BsFillCaretUpFill,BsFillCaretDownFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, selectItemQuantity } from '../../store/cartSlice';

// Single row that contains drink information in the menu
export function Drink({id, name, description, price}) {
    const dispatch = useDispatch();
    const quantity = useSelector(state => selectItemQuantity(state)(id));

    const handleAdd = () => {
        const item = {id: id, name: name, price: price};
        dispatch(addItem({item}));
      }

      const handleRemove = () => {
        dispatch(removeItem({id}));
      }

    // TODO: implement through api up or down percentage
    var random_boolean = Math.random() < 0.5; 
    var random_percentage = Math.round(Math.random() * 10 + 1, 2) + '%';

    return (
        <tr style={{marginTop:0, marginBottom:0}}>
            <th scope="row">{id}</th>
            <td><Link to={`/menu/${id}`}>{name}</Link></td>
            <td>
            {random_boolean ? 
                <p className="text-danger">{price} kr <BsFillCaretDownFill/>({random_percentage})</p> 
            : 
                <p className="text-success">{price} kr <BsFillCaretUpFill/>({random_percentage})</p>
            }</td>
            <td>{description}</td>
            <td>
                {quantity == 0 ? "" : quantity}
                <button onClick={() => {handleAdd()}}>+</button>
                <button onClick={() => {handleRemove()}}>-</button>
            </td>
        </tr>
        )
    }
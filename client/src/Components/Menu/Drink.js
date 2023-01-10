import React from 'react';
import { BsFillCaretUpFill,BsFillCaretDownFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

import { useState } from 'react';

// Single row that contains drink information in the menu
export function Drink({id, name, description, price, addToCart}) {

    const [amount, setAmount] = useState(0)
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
                {amount}
                <button onClick={() => {setAmount(amount + 1)}}>+</button>
                <button onClick={() => {setAmount(amount - 1)}}>-</button>
                <button onClick={() => {addToCart(id, amount)}}>Add to cart</button>
            </td>
        </tr>
        )
    }
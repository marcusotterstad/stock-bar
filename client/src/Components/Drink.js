import React from 'react';
import { BsFillCaretUpFill,BsFillCaretDownFill } from "react-icons/bs";


export function Drink({id, name, description, price}) {
    // TODO: implement through api up or down percentage
    var random_boolean = Math.random() < 0.5; 
    var random_percentage = Math.round(Math.random() * 10 + 1, 2) + '%';

    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>
            {random_boolean ? 
                <p className="text-danger">{price} kr <BsFillCaretDownFill/>({random_percentage})</p> 
            : 
                <p className="text-success">{price} kr <BsFillCaretUpFill/>({random_percentage})</p>
            }</td>
            <td>{description}</td>
            <td><button className="btn-success" onClick={() => console.log("button clicked")}>Order</button></td>
        </tr>
        )
    }
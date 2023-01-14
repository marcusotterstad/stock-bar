import React from 'react';
import { useSelector } from 'react-redux';
import CartRow from './CartRow';

function Cart() {
    const cart = useSelector(state => state.cart);


    const CartRows = [];
    for (let [id, obj] of Object.entries(cart)) {
        console.log(obj)
        CartRows.push( 
            <CartRow
                id={id}
                name={obj.name}
                quantity={obj.quantity}
            />
        )
    }

    return (
        <div>
            <h1>Cart</h1>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Drink Name</th>
                    <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {CartRows}
                </tbody>
            </table>
            <button>Checkout</button>
        </div>
    )
}

export default Cart
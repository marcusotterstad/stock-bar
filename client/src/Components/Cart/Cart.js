import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartRow from './CartRow';

function Cart() {
    const cart = useSelector(state => state.cart);
    const cartEmpty = Object.keys(cart).length === 0;

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
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {CartRows}
                </tbody>
            </table>
            { cartEmpty ?
                <h2>Please add items to cart</h2> :
                <Link to="/checkout" className="active" href="#">Checkout</Link>
            }
        </div>
    )
}

export default Cart
import React, { useState, useEffect } from 'react';
import CheckoutRow from './CheckoutRow';


function Checkout() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetch("http://localhost:3000/menu")
            .then((response) => response.json())
            .then((response) => {/*
                const newObjs = []
                for (const [cartItemId, amount] of Object.entries(cart)) {
                    for(let drinkItem of response) {
                        if(cartItemId == drinkItem.drink_id) {
                            newObjs.push({id: drinkItem.drink_id, name: drinkItem.name, price: drinkItem.current_price, amount: amount});
                        }
                    }
                }
            */
            setData(response)
            });
        }
        fetchData();
    }, []);

    const rows = data.map(row => 
        <CheckoutRow
            id={row.id}
            name={row.name}
            price={row.price}
            amount={row.amount}
        />);

    return (
        <div>
            <h1 onClick={() => {console.log(data)}}>Checkout</h1>
            <table class="table table-dark">
                <thead>
                    <tr>
                    <th scope="col">Drink Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}

export default Checkout
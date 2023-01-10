import React from 'react'

function CheckoutRow({id, name, price, amount}) {
  return (
    <tr key={id}>
        <th scope="row">{name}</th>
        <td>{price}</td>
        <td><button onClick={() => {}}>+</button>{amount}<button>-</button></td>
        <td>x</td>
    </tr>
  )
}

export default CheckoutRow
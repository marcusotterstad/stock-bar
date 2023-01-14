import React from 'react'

function Cart({id, name, quantity}) {
  return (
    <tr key={id}>
        <th scope="row">{name}</th>
        <td><button >+</button>{quantity}<button>-</button></td>
    </tr>
  )
}

export default Cart
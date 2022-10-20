import React, { useState, useEffect } from "react";
const {Drink} = require('./Drink');

export function DrinkList() {
 const [data, setData] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:3000/menu")
    .then((response) => response.json())
    .then((response) => {setData(response)});
  }

  fetchData();
 }, []);

 const drinkList = data.map(drink => <Drink 
  key={drink.drink_id} 
  id={drink.drink_id}  
  name={drink.name}
  description={drink.description}
  price={drink.current_price}
  />);

 return (
    <div>
        <table className="table">
            <thead className="thead-light">
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Drink Name</th>
                <th scope="col">Price</th>
                <th scope="col">description</th>
                </tr>
            </thead>

        <tbody>
        {drinkList}
        </tbody>
        
        </table>
    </div>);
}

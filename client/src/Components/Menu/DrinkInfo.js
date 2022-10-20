import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

//Component to render single drink in a page
function DrinkInfo() {


    const params = useParams();
    const [data, setData] = useState([]);
    const {name, description, current_price, price_history} = data;

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`http://localhost:3000/menu/${params.drink_id}`)
        .then((response) => response.json())
        .then((response) => {setData(response)});
        }
        fetchData();
        ;
    }, []);


    return (<div>
        <p>{name}</p>
        <p>{description}</p>
        <p>{current_price}</p>
    </div>);
}

export default DrinkInfo
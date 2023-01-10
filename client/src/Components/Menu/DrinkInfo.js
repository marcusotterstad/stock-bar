import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import img_1 from './img_1.jpg';


//Component to render single drink in a page
function DrinkInfo() {

    const params = useParams();
    const [data, setData] = useState({});
    const {name, description, currentPrice, priceHistory} = data;

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`http://localhost:3000/menu/${params.drink_id}`)
        .then((response) => response.json())
        .then((response) => {setData(response)});
        }
        fetchData();
        ;
    }, []);

    return (
    <div className='row'>
        <div className='col-sm text-center row'>
            <h2 className='m-4'>{name}</h2>

            <div className='col-sm'>
                <p>current price: </p><p className='text-success'>{currentPrice} kr</p>
                <p>{description}</p>
            </div>

            <div className='col-sm'>
                <img className='img-fluid' src={img_1} />
            </div>

        </div>
        <div className='col-sm '>
            {}
        </div>
    </div>);
}

export default DrinkInfo
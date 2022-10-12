const pool = require('../configs/db.config');
const format = require('pg-format');

//helper functions in /utils
const calculateDrinkPrice = require('../utils/calculateDrinkPrice');
const formatDrinkQueries = require('../utils/formatDrinkQueries');


// A function that updates drink prices in the database every x minutes (timeFrame).

/*  
Description:
    This function selects the amount of drinks has been ordered within a timeframe,
    and updates the price of a drink based on how many orders. It first stores the
    current price of each drink into the price_history table. Then it queries the
    database on how many of each drink has been ordered, feeds that into the function 
    calculateDrinkPrice, and then updates every drink price.
*/

async function updatePrices (timeFrame) {
//setup client database connection
    const client = await pool.connect()

//query current drink prices to currentDrinkPrices variable
    const currentDrinkPrices = await client.query({
    rowMode: 'array',
    text: 'SELECT drink_id, current_price FROM drinks',
    });


//send those previous drink prices to the price_history table
    /*
    client.query(format('INSERT INTO price_history (drink_id, price) VALUES %L', currentDrinkPrices.rows), [], (err, result)=>{
        console.log(err);
        console.log(result);
    });*/

//select total orders of each drink within the timeFrame parameter
    const orderCount = await client.query({
        rowMode: 'array',
        text: `SELECT order_details.drink_id, SUM(order_details.amount)
        FROM order_details 
        INNER JOIN "order" ON "order".order_id=order_details.order_id
        WHERE "order".time BETWEEN NOW() - INTERVAL '${timeFrame} MINUTES' AND NOW() 
        GROUP BY drink_id`
    });

//selects price info for each drink
    const drinkInformation = await client.query({
        rowMode: 'array',
        text: `SELECT drink_id, min_price, max_price, target_orders FROM drinks`
    });

//joins these two tables together into list of objects
    const formattedRows = formatDrinkQueries(orderCount.rows, drinkInformation.rows);

    for(var row of formattedRows) {
        const calculatedPrice = calculateDrinkPrice()
    }

//end current database client connecton
    await client.end()
}

updatePrices(200);
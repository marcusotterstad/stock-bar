const pool = require('../configs/db.config');


//helper functions
const calculateDrinkPrice = require('../utils/calculateDrinkPrice');
const formatDrinkQueries = require('../utils/formatDrinkQueries');
const format = require('pg-format');


// A function that updates drink prices in the database every x minutes (timeFrame).

/*  
Description:
    This function selects how many drinks that have been ordered within a timeframe,
    and updates the price of a drink based on how many orders. It first stores the
    current price of each drink into the price_history table. Then it queries the
    database on how many of each drink has been ordered, feeds that into the function 
    calculateDrinkPrice, and then updates every drink price in the "drinks" SQL table.
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
    client.query(format('INSERT INTO price_history (drink_id, price) VALUES %L', currentDrinkPrices.rows), [], (err, result)=>{
    });

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

//joins these two tables together into a list of objects
    const formattedRows = formatDrinkQueries(orderCount.rows, drinkInformation.rows);
    
//update current_price of each drink
    for(var row of formattedRows) {
        const calculatedPrice = calculateDrinkPrice(row.amountOrdered, row.minPrice, row.maxPrice, row.targetOrdered);
        console.log(calculatedPrice);
        client.query('UPDATE drinks SET current_price=$1 WHERE drink_id=$2;', [calculatedPrice, row.drinkId], (err, result)=>{
            if(err) {
                console.log(err);
            }
        });
    }

//end current database client connecton
    console.log(`${formattedRows.length} prices updated.`);
    client.release();
    return;
}

module.exports = updatePrices;
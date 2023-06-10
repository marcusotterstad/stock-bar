const express = require('express');
const ordersRouter = express.Router();
const pool = require('../configs/db.config');
const format = require('pg-format');
const {body, validationResult } = require('express-validator');

const {getQuery} = require('../utils/dbGet')

// GET all unfulfilled orders
ordersRouter.get("/unfulfilled", getQuery('SELECT * FROM "order" WHERE fulfilled = false'));

// POST new order to the database
ordersRouter.post("/new-order", [
    body('table_no').isInt().isLength({min: 0, max: 15}),
    // check to see if there are less than 20 drinks in the order
    body('drinks').custom((value, {req}) => {
        const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
        if(sumValues(value) > 20) {
            throw new Error('Too many drinks in order');
        }
        return true;
    }),
    body('drinks').isObject().notEmpty() ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
    /*
    Example POST input body:
        {
            table_no: 2,
            drinks: {
                2: 3,
                3: 4
            }
        }
        INSERT INTO order (table_no) VALUES 2 RETURNING order_id; (order_id -> 4)
        INSERT INTO order_details (order_id, drink_id, amount) VALUES (4, 2, 3);
        INSERT INTO order_details (order_id, drink_id, amount) VALUES (4, 3, 4);
    */

    const {table_no, drinks} = req.body;
    let orderId;
    const client = await pool.connect()
    
    const insertOrderDetails = async (order_id) => {
        const drinkOrders = [];

        //formatting from object to array
        for (const [drink_id, amount] of Object.entries(drinks)) {
            drinkOrders.push([order_id, parseInt(drink_id), amount]);
        }

        await client.query(format('INSERT INTO order_details (order_id, drink_id, amount) VALUES %L', drinkOrders), (err, result)=>{
            if(err) {
                res.status(400).json({message: "An error was thrown. Failed to retrieve from database"});
                throw(err)
            }
        })
    }
    //inserts into "order" table with table_no
    await client.query({
        rowMode: 'array',
        text: `INSERT INTO "order" (table_no) VALUES (${table_no}) RETURNING order_id`,
    })
    //gets the returned order_id and inserts all the drinks in the order_details table
        .then((result) => {
            orderId = result.rows[0][0];
            insertOrderDetails(orderId)
        })
    //calculate total price of order
    .then(async () => {
        let total = 0;

        for (const [drink_id, amount] of Object.entries(drinks)) {
            const price = await client.query('SELECT current_price from drinks WHERE drink_id = $1', [drink_id]);
            const parsedPrice = parseFloat(price.rows[0].current_price);
            total += (parsedPrice * amount);
        }

        return total;
    })

    //send order info in json and status code
    .then((total) => {
        client.release()

        // quick cheating algorithm to determine estimated time
        let estimated_time = 0;
        if(total < 250) {
            estimated_time = 5;
        } else if(total < 500) {
            estimated_time = 10;
        } else {
            estimated_time = 15;
        }

        // json object to send back to client
        const orderInfo = {
            order_id: orderId,
            table_no: table_no,
            total: total,
            fulfilled: false,
            estimated_time: 5
        }

        console.log(`Order #${orderId} for table #${table_no} successfully created.`)
        res.status(201).json(orderInfo);
    })
});


// PUT to complete an order from the database by order_id
ordersRouter.put("/complete-order/:order_id",  (req, res) => {
    const order_id = req.params['order_id'];
    pool.query('UPDATE "order" SET fulfilled=true WHERE order_id=$1 RETURNING *', [order_id], (error, results) => {
        if (error) {
            res.status(400).json({message: "An error was thrown. Failed to retrieve from database"});
            throw error
        } else if(results.rowCount === 0) {
            res.status(404).json({message: "order does not exist in database."});
        }
        else {
            res.status(200).json({message: `completed order #${order_id}.`});
        }
    })
})

console.log("Orders router up and running.")
module.exports = ordersRouter;
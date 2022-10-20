const express = require('express');
const ordersRouter = express.Router();
const pool = require('../configs/db.config');
const format = require('pg-format');

const {getQuery} = require('../utils/dbGet')

ordersRouter.get("/unfulfilled", getQuery('SELECT * FROM "order" WHERE fulfilled = false'));

ordersRouter.post("/new-order", async (req, res) => {
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
            } else {
                return `Order with id ${order_id} added.`;
            }
        })
    }
    //inserts into "order" table with table_no
    await client.query({
        rowMode: 'array',
        text: `INSERT INTO "order" (table_no) VALUES (${table_no}) RETURNING order_id`,
        })
    //gets the returned order_id and inserts all the drinks in the order_details table
        .then((result) => insertOrderDetails(result.rows[0]))
    //send success message and status code
        .then((message) => {
            client.release()    
            res.status(201).send(message);
        })
    });

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
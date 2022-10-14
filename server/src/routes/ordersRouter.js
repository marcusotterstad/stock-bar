const express = require('express');
const ordersRouter = express.Router();
const pool = require('../configs/db.config');

const {getQuery} = require('../utils/dbGet')

ordersRouter.get("/unfulfilled", getQuery('SELECT * FROM "order" WHERE fulfilled = false'));

ordersRouter.post("/",  (req, res) => {
    const {table_no} = req.body;
        pool.query('INSERT INTO order (table_no) VALUES ($1) RETURNING *', [table_no], (error, results) => {
            if (error) {
                throw error
            }
            else {
                res.status(200).send(`Order added with ID: ${results.rows[0]}. Fulfilling order soon.`);
            }
        })
    }
)

ordersRouter.put("/complete-order/:order_id",  (req, res) => {
    const order_id = req.params['order_id'];
        pool.query('UPDATE "order" SET fulfilled=true WHERE order_id=$1 RETURNING *', [order_id], (error, results) => {
            if (error) {
                throw error
            } else if(results.rowCount === 0) {
                res.status(404).json({message: "order does not exist in database."});
            }
            else {
                res.status(200).json({message: `completed order #${order_id}.`});
            }
        })
    }
)

console.log("Orders router up and running.")
module.exports = ordersRouter;
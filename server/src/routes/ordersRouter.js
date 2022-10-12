const express = require('express');
const ordersRouter = express.Router();
const pool = require('../configs/db.config');

const {getQuery} = require('../utils/dbGet')

ordersRouter.get("/unfulfilled", getQuery("SELECT * FROM orders WHERE fulfilled = false"));

/*
ordersRouter.post("/",  (req, res) => {
    const {date, drink_id, amount} = req.body;
        pool.query('INSERT INTO orders (ord_date, drink_id, amount, fulfilled) VALUES ($1, $2, $3, false) RETURNING *', [date, drink_id, amount], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Order added with ID: ${results.rows[0]}. Fulfilling order soon.`);
        })
    }
)*/

console.log("Orders router up and running.")
module.exports = ordersRouter;
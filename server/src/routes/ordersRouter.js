const express = require('express');
const ordersRouter = express.Router();
const pool = require('../configs/db.config');

const {getQuery} = require('../services/dbServices')

ordersRouter.get("/", getQuery("SELECT * FROM orders"));

ordersRouter.get("/unfulfilled", getQuery("SELECT * FROM orders WHERE fulfilled = false"));

ordersRouter.get("/totals", getQuery('SELECT orders.ord_id as order, SUM(menu.price*orders.amount) as total FROM menu INNER JOIN orders ON menu.id = orders.drink_id GROUP BY orders.ord_id'))

ordersRouter.get("/date", (req, res) => {
    const {month, year} = req.params;
        pool.query('SELECT * FROM orders WHERE MONTH(ord_date)= $1 AND YEAR(ord_date) = $2', [month, year], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows);
        })
})


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
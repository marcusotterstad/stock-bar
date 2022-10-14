const express = require('express');
const menuRouter = express.Router();
const pool = require('../configs/db.config');

const {getQuery} = require('../utils/dbGet');

menuRouter.get("/", getQuery('SELECT * FROM "drinks"'));

menuRouter.get("/:drink_id/price-history", (req, res, next) => {
    const drink_id = req.params.drink_id;
    pool.query("SELECT drink_id, price FROM price_history WHERE drink_id = $1", [drink_id], (error, results) => {
        if (error) {
            res.status(400).json({message: "An error was thrown. Failed to retrieve from database"});
            throw error
        }
        else if(results.rowCount === 0) {
            res.status(404).json({message: `Drink with id ${drink_id} does not exist in database.`});
        } 
        else {
        res.status(200).json(results.rows);
        }
    });
});

console.log("Menu router up and running.")
module.exports = menuRouter;
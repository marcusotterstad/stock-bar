const express = require('express');
const menuRouter = express.Router();
const pool = require('../configs/db.config');

const {getQuery} = require('../utils/dbGet');

menuRouter.get("/", getQuery('SELECT * FROM "drinks"'));

menuRouter.get("/:drink_id", (req, res) => {
    const drink_id = req.params.drink_id;
    
    Promise.all([
        pool.query('SELECT name, description, current_price FROM drinks WHERE drink_id = $1', [drink_id]),
        pool.query('SELECT DATE(timestamp) as timestamp, price FROM price_history WHERE drink_id = $1', [drink_id])
        ]).then(function([drink_info, price_history]) {
            const {name, description, current_price} = drink_info.rows[0]
            const formattedPriceHistory = price_history.rows.map(obj => [obj.price, obj.timestamp]);
            const formattedObject = {
                name: name,
                description: description,
                currentPrice: current_price,
                priceHistory: formattedPriceHistory
            }
            res.status(200).json(formattedObject)
        }, function(error) {
        throw error;
        });

});

console.log("Menu router up and running.")
module.exports = menuRouter;
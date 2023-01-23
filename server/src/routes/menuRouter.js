const express = require('express');
const menuRouter = express.Router();
const pool = require('../configs/db.config');

const {getQuery} = require('../utils/dbGet');


// GET menu
menuRouter.get("/", getQuery('SELECT * FROM "drinks"'));


// GET single drink information
menuRouter.get("/:drink_id", (req, res) => {
    const drink_id = req.params.drink_id;

        if(isNaN(drink_id)) {
            res.status(400).json({message: "Bad request. Make sure to input a number"})
            return
        }


    
    Promise.all([
        pool.query('SELECT name, description, current_price FROM drinks WHERE drink_id = $1', [drink_id]),
        pool.query('SELECT DATE(timestamp) as timestamp, price FROM price_history WHERE drink_id = $1', [drink_id])
        ]).then(function([drink_info, price_history]) {

            //validate if the database returned a row

            if(drink_info.rows.length == 0 || price_history.rows.length  == 0) {
                res.status(404).json({message: "drink does not exist in database"})
                return
            }

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

menuRouter.get("/:drink_id/price", async (req, res) => {
    const drink_id = req.params.drink_id;

    if(typeof Number(drink_id) !== "number") {
        res.status(400).json({message: "Bad request. Make sure to input a number"})
        return
    }

    pool.query('SELECT current_price FROM drinks WHERE drink_id = $1', [drink_id], (error, results) => {

        if (error) {
            res.status(404).json({message: "Failed to retrieve from database."});
            return
        }

        if(results.rows.length == 0) {
            res.status(404).json({message: "Not found."})
            return
        }


        res.status(200).send({price: results.rows[0].current_price});

    })
})

console.log("Menu router up and running.")
module.exports = menuRouter;

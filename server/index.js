const express = require('express');
const app = require('./src/configs/app.config');
const PORT = 3000;

const timeFrame = 5;

// price update
var cron = require('node-cron');
const updatePrices = require('./src/services/UpdatePrices');

//Routers
const ordersRouter = require('./src/routes/ordersRouter');
app.use("/orders", ordersRouter);

const menuRouter = require('./src/routes/menuRouter');
app.use("/menu", menuRouter);

app.get('/', (req, res, next) => {
    res.status(200).json({message: "Server up and running"});
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })

cron.schedule(`*/${timeFrame} * * * *`, () => {
  updatePrices(timeFrame);
});

module.exports = app;
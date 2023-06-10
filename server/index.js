const express = require('express');
const app = require('./src/configs/app.config');
const PORT = 3000;

const menuRouter = require('./src/routes/menuRouter');
const ordersRouter = require('./src/routes/ordersRouter');


const timeFrame = 5;

// price update
var cron = require('node-cron');
const updatePrices = require('./src/services/UpdatePrices');

//Routers
app.use("/order", ordersRouter);
app.use("/menu", menuRouter);

app.get('/', (req, res, next) => {
    res.status(200).json({message: "Server up and running"});
})

// Development mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} \nUpdating drink prices every ${timeFrame} minutes`)}
  )
}


cron.schedule(`*/${timeFrame} * * * *`, () => {
  updatePrices(timeFrame);
});

module.exports = app;
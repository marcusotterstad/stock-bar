const express = require('express');
const app = require('./src/configs/app.config');
const PORT = 3000;

//Routers
const ordersRouter = require('./src/routes/ordersRouter');
app.use("/orders", ordersRouter);

app.get('/', (req, res, next) => {
    res.status(200).json({message: "Server up and running"});
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })

module.exports = app;
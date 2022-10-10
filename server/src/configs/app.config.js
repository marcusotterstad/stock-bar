const express = require('express');
const app = express();

//middlewares
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



module.exports = app;
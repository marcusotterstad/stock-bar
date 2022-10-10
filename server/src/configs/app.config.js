const express = require('express');
const app = express();

//middlewares
const bodyParser = require('body-parser');
var cors = require('cors')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())




module.exports = app;
const express = require('express');
const menuRouter = express.Router();
const pool = require('../configs/db.config');

const {getQuery} = require('../utils/dbGet');

menuRouter.get("/", getQuery('SELECT * FROM "drinks"'));


console.log("Menu router up and running.")
module.exports = menuRouter;
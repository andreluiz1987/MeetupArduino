'use strict'

const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

mongoose.connect("mongodb://andrecoelho:andre1502@ds241570.mlab.com:41570/arduino_temp")

const temperature = require('./models/temperature');
const index = require('./routes/base');
const temperatureroute = require('./routes/teperature-route')

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use('/', index);
app.use('/temperature', temperatureroute)

module.exports = app;
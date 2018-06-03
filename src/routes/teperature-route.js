'use strict'

const express = require('express');
const serialport = require('serialport')
const router = express.Router();
const controller = require('../controllers/temperature-controller')

let value = ""

router.get('/getTemperature', controller.getLastTemperature)

router.post('/insertTemperature', controller.post)


//define variavel
let SerialPort = serialport.SerialPort;

const Readline = serialport.parsers.Readline;

//configura porta serial
let port = new serialport("COM5", {
    baudRate: 9600,
    parser: new Readline("\n")
});

//Tratar eventos
port.on('open', onOpen);
port.on('data', onData);

//função chamada quando a porta serial recebe dados
function onData(data) {
    console.log(data.toString('utf8'));
    value = data.toString('utf8'); 
    controller.insertTemp(value);
};

//função chamada quando a porta serial é aberta
function onOpen() {
    console.log("serial port open");
}

module.exports = router


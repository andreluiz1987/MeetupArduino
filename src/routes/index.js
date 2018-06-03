
const io = require('socket.io');
const router = require('express').Router();

let serialport = require('serialport');
let SerialPort = serialport.SerialPort;

const Readline = serialport.parsers.Readline;

let port = new serialport("COM5", {
    baudRate: 9600,
    parser: new Readline("\n")
});

port.on('open', onOpen);
port.on('data', onData);

function onData(data) {
    //console.log(data.toString('utf8'));
    io.emit("data",  data);
};

function onOpen() {
    console.log("serial port open");
}

router.get('/', (req, res, next) => {
    //res.send('ads')
    res.render('index.html');
});

module.exports = router;
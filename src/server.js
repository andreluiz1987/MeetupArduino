'use strict'

const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const socket = require('socket.io');
const serialport = require('serialport');

app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

//app.use(require('./routes/index'));
// app.listen(app.get('port'), function () { 
//     console.log('listening on port 3000');
// });

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

var io = socket.listen(server);
io.sockets.on('connection', function () {
    console.log('hello world im a hot socket');
});

app.get('/', (req, res, next) => {
    //res.send('ads')
    res.sendFile(__dirname + '/index.html');
});

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
    io.emit("data",  data.toString('utf8'));
};

function onOpen() {
    console.log("serial port open");
}
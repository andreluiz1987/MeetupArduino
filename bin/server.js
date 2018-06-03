'use scrict'

const app = require('../src/app');
var http = require('http');

//define a porta
const port = 3000;
app.set('port', port);

//cria o servidor
const server = http.createServer(app);

//Inicia o servidor atendendo conexões
server.listen(app.get('port'), function () {
    console.log("API Rodando na porta: " + app.get('port'));
});
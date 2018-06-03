'use scrict'

const mongoose = require('mongoose');
const Temperature = mongoose.model('Temperature');
const repo = require('../repositories/temperature-repository');


exports.getTemperature = async (req, res, next) => {

    try {
        var data = await repo.getTemperature();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "falha ao processar sua requisição."
        });
    }
};

exports.getLastTemperature = async (req, res, next) => {

    try {
        var data = await repo.getLastTemperature();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "falha ao processar sua requisição."
        });
    }
};

exports.insertTemp = (data) => {
    repo
        .create(data)
        .then(x => {
            console.log('Produto cadastrado com sucesso!')
        })
        .catch(e => {
            console.log(e)
        });
}

exports.post = (req, res, next) => {

    var temperature = new Temperature(req.body);

    console.log(temperature);

    repo
        .create(temperature.value)
        .then(x => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso!'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto!',
                data: e
            });
        });
};
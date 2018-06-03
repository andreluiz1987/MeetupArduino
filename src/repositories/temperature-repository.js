'use strict';

const mongoose = require('mongoose');
const Temperature = mongoose.model('Temperature');

exports.getTemperature = async () => {
    const res = await Temperature.find();
    return res;
}

exports.getLastTemperature = async () => {
    const res = await Temperature.findOne({}).sort({ date_received: 'desc' })
    return res;
}

exports.create = async (data) => {
    var temperature = new Temperature();
    temperature.value = data
    temperature.date_received = new Date()
    await temperature.save();
};

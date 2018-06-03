'use strict ';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    value: {
        type: Number
    },
    date_received: {
        type: Date
    }
});

module.exports = mongoose.model('Temperature', schema);



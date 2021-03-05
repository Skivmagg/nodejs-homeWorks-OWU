const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum: { CAR } } = require('../../constant');

const carSchema = new Schema({
    model: { type: String, required: true },
    year: { type: Number },
    price: { type: Number, default: 500 }
});

module.exports = model(CAR, carSchema);

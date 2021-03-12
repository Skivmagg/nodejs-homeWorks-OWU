const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum: { CAR } } = require('../../constant');

const carSchema = new Schema({
    model: { type: String, required: true },
    year: { type: Number },
    price: { type: Number, default: 500 },
    photos: [{ type: String, required: false }],
    docs: [{ type: String, required: false }],
});

module.exports = model(CAR, carSchema);

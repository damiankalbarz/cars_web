const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    marka: { type: String, required: true },
    model: { type: String, required: true },
    rocznik: { type: String, required: true },
    przebieg: { type: String, required: true },
})

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
const mongoose = require('mongoose');


const platesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    platecounter: { type: Number , require: true },
    platecounter_char1:{ type: Number , require: true },
    platecounter_char2:{ type: Number , require: true }
});

module.exports= mongoose.model('Plate', platesSchema);
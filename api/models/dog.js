const mongoose = require('mongoose');


const dogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    name: { type: String , require: true },
    dogImage:{ type: String , require: true },
    status:{ type: String , require: true },
    platenumber:{ type: String , require: true }
});

module.exports= mongoose.model('Dog', dogSchema);
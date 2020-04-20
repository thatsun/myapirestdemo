const mongoose = require('mongoose');


const dogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    name: { type: Text , require: true },
    dogImage:{ type: Text , require: true },
    status:{ type: Text , require: true },
    platenumber:{ type: Text , require: true }
});

module.exports= mongoose.model('Dog', dogSchema);
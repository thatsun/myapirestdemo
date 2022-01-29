const mongoose = require('mongoose');


const roluserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String,
        require: true ,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String , require: true },
    username: { type: String , require: true },
    rol: { type: String , require: true }
});

module.exports= mongoose.model('Roluser', roluserSchema);
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    Id: mongoose.Schema.Types.ObjectId,
    email: { type: String,
        require: true ,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String , require: true }
});

module.exports= mongoose.model('User', userSchema);
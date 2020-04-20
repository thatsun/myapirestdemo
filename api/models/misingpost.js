const mongoose = require('mongoose');


const misingpostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    dogid: { type: mongoose.Schema.Types.ObjectId, ref: 'Dog', require: true },
    message:{ type: String ,required:true },
    dogphoto:{type:String , required:true}
});

module.exports= mongoose.model('Misingpost', misingpostSchema);
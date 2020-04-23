const mongoose = require('mongoose');


const newapostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    postheader:{ type: String ,required:true },
    postmessage:{ type: String ,required:true },
    postedby:{ type: String ,required:true },
    postdog:{ type: String ,required:true },
    postdogid: { type: mongoose.Schema.Types.ObjectId, ref: 'Dog', require: true },
    postmode:{ type: String ,required:true },
    postplate:{ type: String ,required:true },
    postuserid:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true}
});

module.exports= mongoose.model('Newspost', newapostSchema);
const mongoose = require('mongoose');



const newpostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    postheader:{ type: String ,required:true },
    postmessage:{ type: String ,required:true },
    postedby:{ type: String ,required:true },
    postdog:{ type: String },
    postdogid: { type: mongoose.Schema.Types.ObjectId, ref: 'Dog'},
    postmode:{ type: String ,required:true },
    postplate:{ type: String  },
    postuserid:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    postcoments:{ type: [String] }
});

module.exports= mongoose.model('Newspost', newpostSchema);
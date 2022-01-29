const mongoose = require('mongoose');



const newtodoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{ type: String ,required:true },
    description:{ type: String ,required:true },
    by:{ type: String ,required:true },
    status:{ type: String },
    postdate:{ type: [Number] },
    deadline:{ type: [Number] },
    details:{ type: String },
    userid:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    postcoments:{ type: [String] }
});

module.exports= mongoose.model('Newtodo', newtodoSchema);
const mongoose = require('mongoose');
const Plate= require('../models/plates');


exports.resetPlates=(req,res,next) =>{   
    
    const plates=new Plate({
        _id: new mongoose.Types.ObjectId(),
        platecounter: 0,
        platecounter_char1: 0,
        platecounter_char2: 0        
    });
    plates
        .save()
        .then(result=>{
            console.log(result);
            res.status(201).json({
                message: 'plate data restored',
                createdProduct: {
                    Id: result._id,
                    platecounter: result.platecounter,
                    platecounter_char1: result.platecounter_char1,
                    platecounter_char2: result.platecounter_char2                    
                }
            });
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({
                message: err
            });
        });

    
}
exports.get_platedata=(req,res,next) =>{
    const Id= '5e9e06bff2481b1954a59376';
    Plate.findById(Id)
        .select('platecounter platecounter_char1 platecounter_char2 _id')
        .exec()
        .then(doc =>{
            console.log("From database",doc);

            if(doc){
                const newserie=doc.platecounter+1;
                const char1=doc.platecounter_char1;
                const char2=doc.platecounter_char2;
                



                Plate.updateOne({ _id: doc._id }, { platecounter: newserie.toString(), platecounter_char1: char1.toString(), platecounter_char2: char2.toString()})
                    .exec()
                    .then(result => {
                        console.log(result);
                        res.status(200).json({message: 'getnewplate succes'                           
                        });
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                        error: err
                    });
                });
            }
            else{
                res.status(404).json({ message: 'missing plate data'});
            }                
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err});
        });
    
    
}
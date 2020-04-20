const mongoose = require('mongoose');
const Dog= require('../models/dog');
const Plate= require('../models/dogcounter');

exports.dogs_get_all=(req,res,next) =>{
    const userId= req.body.userId;
    Dog.find({user:userId})
    .select('name _id dogImage platenumber status')
    .exec()
    .then(docs=> {
        const response={            
            dogs: docs.map(doc=>{
                return{
                    name: doc.name,
                    dogImage: doc.dogImage,                    
                    status: doc.status,
                    platenumber: doc.platenumber,
                    Id: doc._id,
                    request: {
                        typerequest: 'GET',
                        url: 'https://myapirestdemo.herokuapp.com/dogs/'+doc._id
                    }

                }
            })

        };
        console.log(docs);
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.dogs_add_dog=(req,res,next) =>{   
    console.log(req.file);

    

    Plate.findById('5e9d31311c9d440000298b1a')
        .select('platecounter platecounter_char1 platecounter_char2')
        .exec()
        .then(doc =>{
            
            
            
            if(doc){
                console.log("Previous",doc.platecounter , doc.platecounter_char1,platecounter_char2);
                

                var newplate=doc.platecounter1;
                var charnumber1= doc.platecounter_char1;
                var charnumber2= doc.platecounter_char2;      
                resolve(newplate,charnumber1,charnumber2);
            }
            else{
                res.status(404).json({ message: 'Error al crear la placa nueva'});
            }
                  
        }).then( (newplate , charnumber1, charnumber2) =>{
            newplate=newplate+1;
            if(newplate==10){
                if(charnumber1==4 & charnumber2==4){
                    charnumber1=0;
                    charnumber2=0;
                    newplate=1;

                }
                else{
                    if(charnumber2==4){
                        charnumber1=charnumber1+1;
                        charnumber2=0;
                        newplate=1;

                    }
                    else{
                        charnumber2=charnumber2+1;
                        newplate=1;

                    }

                }

            }
            const chars=['a','b','c','d','e'];
            var _newplate=chars[charnumber1]+chars[charnumber2]+'-'+newplate.toString(); 
            var plateupdateOps=[
                { "propName": "platecounter" , "value": newplate.toString()},
                { "propName": "platecounter_char1" , "value": charnumber1.toString()},
                { "propName": "platecounter_char2" , "value": charnumber2.toString()}
        
            ];
            resolve(_newplate,plateupdateOps);

        }).then( (_newplate,plateupdateOps)=>{
            Plate.updateOne({ _id: '5e9d31311c9d440000298b1a' }, plateupdateOps)
                .exec()
                .then(result => {
                    console.log(result);
                    resolve(_newplate);
                })
                .then( _newplate =>{
                    const Dog=new Dog({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        user: req.body.userId,
                        platenumber:_newplate,
                        dogImage: req.file.path
                    });
                    Dog.save()
                        .then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message: 'Dog added succesfully',
                            createdDog: {
                            name: result.name,
                            user: result.user,
                            Id: result._id,
                            dogImage: result.dogImage,
                            request: {
                                typerequest: 'GET',
                                url: 'https://myapirestdemo.herokuapp.com/dogs/'+result._id
                                } 
                            }
                            });
                        })
                        .catch(err=> {
                            console.log(err);
                            res.status(500).json({
                            message: err
                        });
                    });

                })
                .catch(err=>{
                console.log(err);
                    res.status(500).json({
                    error: err
                });
            });


        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err});
        });
}

exports.dogs_get_dog=(req,res,next) =>{
    const Id= req.params.dogId;
    Dog.findById(Id)
        .select('name user _id dogImage platenumber status')
        .exec()
        .then(doc =>{
            console.log("From database",doc);
            if(doc){
                
                res.status(200).json({message: 'Dog info found',
                DogInfoFound: {
                    name: doc.name,
                    user: doc.user,
                    Id: doc._id,
                    dogImage: doc.dogImage,
                    platenumber:doc.platenumber,
                    request: {
                        typerequest: 'GET',
                        description: 'Get all dogs',
                        url: 'https://myapirestdemo.herokuapp.com/dogs'
                    } 
                 }
                });
            }
            else{
                res.status(404).json({ message: 'No valid entry found for provided ID'});
            }            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err});
        });
    
    
}

exports.dogs_edit_dog=(req,res,next) =>{
    const Id=req.params.dogId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;

    }

    Dog.updateOne({ _id: Id }, updateOps)
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({message: 'Dog info updated succesfully',
        UpdatedDog: {
           
            request: {
                typerequest: 'GET',
                url: 'https://myapirestdemo.herokuapp.com/dogs/'+Id
            } 
        }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
       
}

exports.dogs_delete_dog=(req,res,next) =>{
    const Id=req.params.dogId;

    Dog.deleteOne({_id: Id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Dog deleted'
        });
    })
    .catch( err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });

    });
       
}
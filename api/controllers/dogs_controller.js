const mongoose = require('mongoose');
const Dog= require('../models/dog');
const Plate= require('../models/plates');

exports.dog_verify_secret=(req,res,next)=>{

    Dog.find({platenumber:req.body.platenumber})
    .select('secretcode')
    .exec()
    .then(docs =>{
        if(docs.length>0){
            if(req.body.secretcode===docs[0].secretcode){
                res.status(200).json({message: 'match'});

            }
            else{
                res.status(200).json({message: 'dont macth'});

            }

        }
        else{
            res.status(200).json({message: 'dont macth'});
        }

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });



}
exports.dog_change_status=(req,res,next)=>{

    Dog.updateOne({ _id: req.body.dogid }, { status: req.body.status})
    .exec()
    .then(result =>{
        
        res.status(200).json({message: 'updated'});
        

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });



}
exports.dogs_get_all=(req,res,next) =>{
    const userId= req.params.userId;
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
                    secretcode: doc.secretcode,
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

    console.log(req.file);
    
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

                const chars=['a','b','c','d'];
                



                Plate.updateOne({ _id: doc._id }, { platecounter: newserie.toString(), platecounter_char1: char1.toString(), platecounter_char2: char2.toString()})
                    .exec()
                    .then(result => {
                        console.log(result);
                        const dog=new Dog({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            user: req.body.user,
                            dogImage: req.file.path,
                            status:'normal',
                            platenumber: chars[char1]+chars[char2]+'-'+newserie.toString(),
                            secretcode: req.body.secretcode
                        });
                        dog.save()
                            .then(result=>{
                                console.log(result);
                                res.status(201).json({
                                    message: 'Dog Added succesfully',
                                        createdDog: {
                                        name: result.name,
                                        user: result.user,
                                        Id: result._id,
                                        dogImage: result.dogImage,
                                        status:result.status,
                                        platenumber:result.platenumber,
                                        secretcode: result.secretcode,
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
                    secretcode: doc.secretcode,
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
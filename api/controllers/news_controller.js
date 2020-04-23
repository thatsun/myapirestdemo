const mongoose = require('mongoose');
const Newspost= require('../models/news');



exports.news_get_all=(req,res,next) =>{    
    Newspost.find()
    .select('_id postheader postmessage postedby postdog postdogid postmode postplate postuserid')
    .exec()
    .then(docs=> {
        const response={            
            news: docs.map(doc=>{
                return{
                    postheader: doc.postheader,
                    postmessage: doc.postmessage,                    
                    postedby: doc.postedby,
                    postdog: doc.postdog,
                    postdogid: doc.postdogid,                    
                    postmode: doc.postmode,
                    postplate: doc.postplate,
                    postuserid: doc.postuserid,
                    Id:doc._id

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

exports.news_add_post=(req,res,next) =>{      
    
    
    const newspost=new Newspost({
        _id: new mongoose.Types.ObjectId(),
        postheader: req.body.postheader,
        postmessage: req.body.postmessage,                    
        postedby: req.body.postedby,
        postdog: req.body.postdog,
        postdogid: req.body.postdogid,                    
        postmode: req.body.postmode,
        postplate: req.body.postplate,
        postuserid: req.body.postuserid
    });
    newspost
        .save()
        .then(result=>{
            console.log(result);
            res.status(201).json({
                message: 'Post created succesfully',
                createdPost: {
                    postheader: result.postheader,
                    postmessage: result.postmessage,                    
                    postedby: result.postedby,
                    postdog: result.postdog,
                    postdogid: result.postdogid,                    
                    postmode: result.postmode,
                    postplate: result.postplate,
                    postuserid: result.postuserid,
                    Id:result._id

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

exports.news_get_post=(req,res,next) =>{
    const Id= req.params.postID;
    Newspost.findById(Id)
        .select('_id postheader postmessage postedby postdog postdogid postmode postplate postuserid')
        .exec()
        .then(doc =>{
            console.log("From database",doc);
            if(doc){
                
                res.status(200).json({message: 'Post info found',
                PostInfoFound: {
                    postheader: req.postheader,
                    postmessage: req.body.postmessage,                    
                    postedby: req.body.postedby,
                    postdog: req.body.postdog,
                    postdogid: req.body.postdogid,                    
                    postmode: req.body.postmode,
                    postplate: req.body.postplate,
                    postuserid: req.body.postuserid,
                    Id: doc._id                    
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

exports.news_edit_post=(req,res,next) =>{
    const Id=req.params.postId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;

    }

    Newspost.updateOne({ _id: Id }, updateOps)
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({message: 'Post info updated succesfully'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
       
}

exports.news_delete_post=(req,res,next) =>{
    const Id=req.params.postId;

    Dog.deleteOne({_id: Id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Post deleted'
        });
    })
    .catch( err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });

    });
       
}
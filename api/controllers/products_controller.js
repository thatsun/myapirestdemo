const mongoose = require('mongoose');
const Product= require('../models/product');

exports.products_get_all=(req,res,next) =>{
    

    
    Product.find()
    .select('name price Id productImage')
    .exec()
    .then(docs=> {
        const response={            
            products: docs.map(doc=>{
                return{
                    name: doc.name,
                    price: doc.price,
                    Id: doc.Id,
                    request: {
                        typerequest: 'GET',
                        url: 'https://myapirestdemo.herokuapp.com/products/'+doc.Id
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

exports.products_crate_product=(req,res,next) =>{   
    console.log(req.file);
    const product=new Product({
        Id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(result=>{
            console.log(result);
            res.status(201).json({
                message: 'Product created succesfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    Id: result.Id,
                    productImage: result.productImage,
                    request: {
                        typerequest: 'GET',
                        url: 'https://myapirestdemo.herokuapp.com/products/'+result.Id
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

    
}

exports.products_get_product=(req,res,next) =>{
    const Id= req.params.productId;
    Product.findById(Id)
        .select('name price Id productImage')
        .exec()
        .then(doc =>{
            console.log("From database",doc);
            if(doc){
                
                res.status(200).json({message: 'Product found',
                ProductFound: {
                    name: doc.name,
                    price: doc.price,
                    Id: doc.Id,
                    productImage: doc.productImage,
                    request: {
                        typerequest: 'GET',
                        description: 'Get all products',
                        url: 'https://myapirestdemo.herokuapp.com/products'
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

exports.products_edit_product=(req,res,next) =>{
    const Id=req.params.productId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;

    }

    Product.updateOne({ Id: Id }, updateOps)
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({message: 'Product updated succesfully',
        UpdatedProduct: {
           
            request: {
                typerequest: 'GET',
                url: 'https://myapirestdemo.herokuapp.com/products/'+Id
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

exports.products_delete_product=(req,res,next) =>{
    const Id=req.params.productId;

    Product.deleteOne({Id: Id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted'
        });
    })
    .catch( err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });

    });
       
}
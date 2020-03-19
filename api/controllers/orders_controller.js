const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_get_all= (req,res,next)=>{
    Order.find()
    .select('product quantity Id')
    .populate('product','name')
    .exec()
    .then( docs =>{
        res.status(200).json({
            coont: docs.length,
            orders: docs.map(doc =>{
                return{
                    Id: doc.Id,
                    product: doc.product,
                    quantity: doc.quantity,
                    typerequest: {
                        type: 'GET',
                        url: 'https://myapirestdemo.herokuapp.com/orders/'+doc.Id
                    }
                }
            })

        });
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
}

exports.orders_create_order=(req,res,next)=>{

    Product.findById(req.body.productId)
    .then(product =>{

        if(!product){
            return res.status(404).json({
                message:'Product not found'
            });

        }
        const order= new Order({
            Id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
    
        });    
        return order.save()
    }).then(result => {
        console.log(result);
        res.status(201).json({
            message: 'order stored',
            createdOrder:{
                Id: result.Id,
                product: result.product,
                quantity: result.quantity
            },
            typerequest: {
                type: 'GET',
                url: 'https://myapirestdemo.herokuapp.com//orders/'+ result.Id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
    
}

exports.orders_get_order=(req,res,next)=>{
    Order.findById(req.params.orderId)
    .select('product quantity Id')
    .populate('product','name')
    .exec()
    .then(order =>{
        if(!order){
            return res.status(404).json({
                message: 'Order not found'
            });

        }
        res.status(200).json({
            order: order,
            typerequest:{
                type: 'GET',
                url: 'https://myapirestdemo.herokuapp.com//orders'

            }
        });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.orders_delete_order=(req,res,next)=>{
    Order.deleteOne({ Id: req.params.orderId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: 'Order deleted',
            typerequest:{
                type: 'POST',
                url: 'https://myapirestdemo.herokuapp.com/orders',
                body:{ productId: 'ID', quantity:'Number'}
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
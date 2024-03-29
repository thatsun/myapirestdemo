const express = require('express');
const app= express();
const morgan= require('morgan');
const bodyParser=require('body-parser');
const path=require('path');
const favicon=require('serve-favicon');


const mongoose=require('mongoose');

const producRoutes= require('./api/routes/products');

const orderRoutes= require('./api/routes/orders');

const userRoutes= require('./api/routes/users');

const dogsRoutes= require('./api/routes/dogs');

const platesRoutes= require('./api/routes/plates');

const newsRoutes= require('./api/routes/news');


const docsRoutes= require('./api/routes/documentation');



app.use(express.static(__dirname +'/public'));
app.use(favicon(path.join(__dirname, 'public','favicon.ico')));


mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}@apirestdemo.v3vxb.azure.mongodb.net/?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true});


app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));




app.use((req,res,next)=>{
    res.header("Acces-Control-Allow-Origin","*");
    res.header("Acces-Control-Allow-Headres","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header('Acces-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});

    }
    next();
})
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/products', producRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use('/dogs', dogsRoutes);
app.use('/plates', platesRoutes);
app.use('/news', newsRoutes);
app.use('/', docsRoutes);


app.use((req,res,next)=>{
    const error= new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.estatus || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./API/routes/products');

mongoose.connect("mongodb://localhost:27017/ShoppingCart",{useNewUrlParser: true, useUnifiedTopology: true },function(error){
    if(error){
        console.log("error: "+error);
    }
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', '*');
   if(res.method === 'OPTIONS') {
       res.header('Access-Control-Allow-Methods', '*');
       return res.status(200).json({});
   }
   next();
});

app.use('/products', productRoutes);

app.use((req, res, next) => {
    const error = new Error('Page Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    });
});

module.exports = app;
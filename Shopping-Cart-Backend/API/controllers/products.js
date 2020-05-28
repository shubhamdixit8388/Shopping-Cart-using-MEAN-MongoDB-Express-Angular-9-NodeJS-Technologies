const Product = require('../models/product');
const mongoose = require('mongoose');

exports.getAllProducts = (req, res, next) => {
    Product.find().exec().then(result => {
        res.status(200).json({
            message: 'Data Fetched',
            result: result
        });
    }).catch(error => {
        res.status(200).json({
            message: 'Failed to fetch data'
        });
    });
};

exports.saveProduct = (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        res.status(200).json({
            message: 'Data Uploaded'
        });
    }).catch(error => {
        res.status(200).json({
            message: 'Failed to save data'
        });
    });
};
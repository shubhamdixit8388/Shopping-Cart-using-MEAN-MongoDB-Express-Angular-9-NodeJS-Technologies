const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

router.get('', productController.getAllProducts);

router.post('/', productController.saveProduct);

module.exports = router;
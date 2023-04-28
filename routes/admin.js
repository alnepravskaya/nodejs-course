const path = require('path');

const express = require('express');

const {getAddProduct, postAddProduct, postEditProduct, getProducts, getEditProduct, postDeleteProduct,} = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', getAddProduct);
router.get('/products', getProducts);
router.post('/add-product', postAddProduct);
router.post('/delete-product', postDeleteProduct);
router.get('/edit-product/:productId', getEditProduct);
router.post('/edit-product', postEditProduct);

module.exports = router;

const path = require('path');

const express = require('express');
const {getProducts, getIndex, getCheckout, postCart, getCart, getOrders, getProduct, postCartDelete, postOrder} = require("../controllers/shop");

const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/cart', getCart);
router.post('/cart', postCart);
router.post('/cart-delete-item', postCartDelete);
router.get('/checkout', getCheckout);
router.get('/orders', getOrders);
router.post('/create-order', postOrder);
router.get('/products/:productId', getProduct);

module.exports = router;

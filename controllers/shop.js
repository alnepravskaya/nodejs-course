const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId).then( product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then(products => {
    debugger
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });
  })
};

exports.postOrder = (req, res, next) => {
  req.user.addOrder().then(()=> res.redirect("/orders")).catch(err=> console.log(err))
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId).then( product => {

    return req.user.addToCart(product).then(result=> {
      res.redirect('/cart')
    });
  })
};

exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteItemFromCart(prodId).then( product => {
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders().then(
      orders=> {
        res.render('shop/orders', {
          path: '/orders',
          pageTitle: 'Your Orders',
          orders: orders
        });
      }
  )

};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

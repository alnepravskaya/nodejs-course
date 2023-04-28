const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res) => {
    const {title, imageUrl, price, description} = req.body;

    const product = new Product(null, title, imageUrl, description, price, req.user._id);
    product.save().then(() => res.redirect('/admin/products')).catch(err => console.log(err));

};

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId).then( product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })

};

exports.postEditProduct = (req, res, next) => {
    const   {title, productId, price, imageUrl, description } = req.body;

    const product = new Product(productId, title, imageUrl, description, price);
    product.save().then(result =>  res.redirect('/admin/products')).catch(err => console.log(err));
};

exports.getProducts = (req, res) => {
    Product.fetchAll().then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId).then(result =>  res.redirect('/admin/products')).catch(err => console.log(err));
};

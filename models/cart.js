const fs = require('fs');
const path = require('path');

const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json')

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(filePath, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            const existingProduct = cart.products.find(prod => prod.id === id);
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            let updatedProduct;

            if (existingProduct) {
                updatedProduct = {...existingProduct}
                updatedProduct.qty = existingProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id: id, qty: 1}
                cart.products = [...cart.products, updatedProduct]

            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(filePath, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(filePath, (err, fileContent) => {
            if (err) {
                return;
            }
            debugger
            const cart = JSON.parse(fileContent);
            const updatedCart = {...cart};
            const product = updatedCart.products?.find(prod => prod.id === id);
            if(!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products?.filter(prod => prod.id !== id)
            updatedCart.totalPrice = cart.totalPrice - productPrice * productQty;

            fs.writeFile(filePath, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        })
    }

    static getCart(cb) {
        fs.readFile(filePath, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err) {
                cb(null)
            }else {
                cb(cart);
            }

        })
    }
}

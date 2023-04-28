const getDb = require("../util/database").getDb;
const mongodb = require("mongodb")


module.exports = class Product {
    constructor(id, title, imageUrl, description, price, userId) {
        this._id = id && new mongodb.ObjectId(id);
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection("products")
                .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this})
        } else {
            dbOp = db.collection("products")
                .insertOne(this)
        }

        return dbOp
            .then(result => {
                console.log(result, "insert products")
            })
            .catch(err => {
                console.log(err)
            });
    }

    static deleteById(id) {
        const db = getDb();
        return db.collection("products").deleteOne({_id: new mongodb.ObjectId(id)}).then(product => {console.log(product)}
        ).catch(err => console.log(err));
    }

    static fetchAll(cb) {
        const db = getDb();
        return db.collection("products").find().toArray().then(products => {
                console.log(products)
                return products;
            }
        ).catch(err => console.log(err));
    }

    static findById(id) {
        const db = getDb();
        return db.collection("products").find({_id: new mongodb.ObjectId(id)}).next()
            .then(product => {
                    debugger
                    return product;
                }
            ).catch(err => console.log(err));

    }
}

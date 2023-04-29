const mongodb = require('mongodb');
const {MONGODB_URI} = require("../constants");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(MONGODB_URI)
        .then(client => {
            _db = client.db();
            callback(client);
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const getDb = ()=> {
    if(_db) {
        return _db;
    }
    throw "No database found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


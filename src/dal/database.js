import { createBrewery } from './brewery';

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
const url = "mongodb+srv://devel:HTCjoVDQBXEH9inZ@cluster0-xrkzw.mongodb.net/tiltnpour?retryWrites=true&w=majority";

var insertDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');

    // Insert some documents
    collection.insertMany([
        createBrewery(), createBrewery()
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

// Use connect method to connect to the server
export const testDb = () => {
    console.log(url);
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        insertDocuments(db, function () {
            db.close();
        });
    });




}
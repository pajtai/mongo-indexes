'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/indextest';

MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const collection = db.collection('documents');

    collection.find({
        content : {
            $regex : /^[a-h]/
        }
    }).explain((err, res) => {
        assert.equal(null, err);
        console.log(JSON.stringify(res, null, 4));
    });

    db.close();
});

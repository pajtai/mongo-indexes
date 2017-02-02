'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/indextest';

MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const collection = db.collection('documents');

    collection.find({
        from : {
            $gte : new Date(1939, 9, 1)
        },
        to : {
            $lte : new Date(1945, 9, 2)
        },
        content : {
            $regex : /^[a-h]/
        }
    }).explain((err, res) => {
        assert.equal(null, err);
        console.log(JSON.stringify(res, null, 4));
    });

    db.close();
});

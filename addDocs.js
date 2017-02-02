'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/indextest';
const startDate = new Date(1900, 1, 1);
const fromEndDate = new Date(1999, 12, 30);
const endDate = new Date(1999, 12, 31);

let counter = 50000;

MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const collection = db.collection('documents');

    while (counter--) {
        let from = randomDate(startDate, fromEndDate);
        collection.insertOne({
            from : from,
            to : randomDate(from, endDate),
            content : makeString()
        })
    }

    db.close();
});

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function makeString(stringLength = 5)
{
    let text = "";
    const possible = "abcdefghijklmnopqrstuvwxyz";
    let i = stringLength;

    while (i--) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
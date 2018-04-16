var express = require('express');
var mongoose = require('mongoose');
var app = express();
var MONGO_URI = require('./global/mongoUri').MONGO_URI;

function connectToDb () {
    try {
        mongoose.connect(MONGO_URI, {
            useMongoClient: true,
        });
        mongoose.Promise = global.Promise;
        const db = mongoose.connection;

        db.on('error', (err) => {
            console.log();
            error(err);
            throw new Error(err);
        });
        db.once('open', () => {
            console.log('Successfully connected to database!');
            console.log();

            // Place seed logic here, ie first fetching something
            // from mocky.io
            // axios.get(/* mocky.io/bla */).then(/* do something with the request like spamming a bunch of queries */)

            // then afterwards close the seeder..
            process.exit();
        });
    } catch (err) {
        throw new Error(err);
    }
}

connectToDb();

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(3000);
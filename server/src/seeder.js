const Cursus = require('./global/models/Cursus');
const Cursist = require('./global/models/Cursist');
require('dotenv').config();

var express = require('express');
var mongoose = require('mongoose');
var app = express();
var MONGO_URI = require('./global/mongoUri').MONGO_URI;
const uuid = require('uuid');
const hash = require('bcrypt').hash;

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

            // id: { type: String, required: true, unique: true },
            // cursustitel: { type: String, required: true },
            // cursusprijs: { type: Number },
            // begindatum: { type: String, required: true },
            // einddatum: { type: String, required: true },

            Cursus.create({
                id: uuid(),
                cursustitel: 'Test data cursus titel 1',
                cursusprijs: 475000,
                begindatum: '2015-12-12',
                einddatum: '2015-12-20',
                inschrijvingen: ['1234'],
            }, function () {
                Cursus.create({
                    id: uuid(),
                    cursustitel: 'Test data cursus titel 2',
                    cursusprijs: 500000,
                    begindatum: '2016-12-12',
                    einddatum: '2022-12-20',
                    inschrijvingen: ['1234', '12345', '1234567'],
                }, function () {
                    Cursus.create({
                        id: uuid(),
                        cursustitel: 'Test data cursus titel 3',
                        cursusprijs: 210000,
                        begindatum: '2015-12-05',
                        einddatum: '2017-12-15',
                        inschrijvingen: ['1234', '1234567'],
                    }, function () {
                        Cursus.create({
                            id: uuid(),
                            cursustitel: 'Test data cursus titel 4',
                            cursusprijs: 130000,
                            begindatum: '2005-12-05',
                            einddatum: '2010-12-15',
                            inschrijvingen: ['1234567', '1234', '12345'],
                        }, function () {
                            hash('thomas', Number(process.env.salt), function (err, encryptedPassword) {
                                Cursist.create({
                                    id: '1234',
                                    username: 'thomas',
                                    password: encryptedPassword,
                                    role: 'medewerker',
                                }, function () {
                                    Cursist.create({
                                        id: '12345',
                                        username: 'thomas-2',
                                        password: encryptedPassword,
                                        role: 'medewerker',
                                    }, function () {
                                        Cursist.create({
                                            id: '1234567',
                                            username: 'thomas-3',
                                            password: encryptedPassword,
                                            role: 'medewerker',
                                        }, function () {
                                            // then afterwards close the seeder..
                                            process.exit();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
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
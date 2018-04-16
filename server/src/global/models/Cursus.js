const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    cursustitel: { type: String, required: true },
    cursusprijs: { type: Number },
    begindatum: { type: String, required: true },
    einddatum: { type: String, required: true },
    inschrijvingen: { type: [] },
});

const Cursus = mongoose.model('Cursus', schema);

module.exports = Cursus;

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    username: { type: String, maxLength: 255, required: true, unique: true, },
    password: { type: String, maxLength: 255, required: true },
    role: { type: String, maxLength: 255, default: 'gebruiker' },
});

const Cursist = mongoose.model('Cursist', schema);

module.exports = Cursist;

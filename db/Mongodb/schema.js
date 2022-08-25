const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        name: 'string',
        age: 'number'
    }
);


module.exports = mongoose.model('Test', schema)
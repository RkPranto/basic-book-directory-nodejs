const mongoose = require('mongoose');

const publisherSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    books:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'Book'
        }
    ]
});


module.exports = publisherSchema;
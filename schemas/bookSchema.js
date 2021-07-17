const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    desc:String,
    authorId:{
        type: mongoose.Types.ObjectId,
        ref: 'Author'
    },
    publisherId:{
        type: mongoose.Types.ObjectId,
        ref: 'Publisher'
    }
});


module.exports = bookSchema;
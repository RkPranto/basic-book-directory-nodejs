const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bookDirRoute = express.Router();
const bookSchema = require('../schemas/bookSchema');
const Book = mongoose.model('Book', bookSchema);

mongoose.model('Publisher', require('../schemas/publisherSchema'));
mongoose.model('Author', require('../schemas/authorSchema'));


//get all books
bookDirRoute.get('/',async (req, res)=>{
    const allBooks = await Book.find()
        .populate('publisherId', '-books')
        .populate('authorId', '-__v')
        .select({
            __v: 0
        });

    try{
        res.status(200).json(allBooks);
    }  
    catch(err){
        console.log("bookDir: "+err);
        res.status(500).send("Server Error");
    }

});


//get only one book
bookDirRoute.get('/:id', (req, res)=>{

});



module.exports = bookDirRoute;
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const adminRoute = express.Router();

const bookSchema = require('../schemas/bookSchema');
const Book = mongoose.model('book', bookSchema);

const authorSchema = require('../schemas/authorSchema');
const Author = mongoose.model('author', authorSchema);

const publisherSchema = require('../schemas/publisherSchema');
const Publisher = mongoose.model('publisher', publisherSchema);


//post one book
adminRoute.post('/', async (req, res)=>{
    const newBook = new Book(req.body);

    console.log(newBook);

    try{
        await newBook.save( async (err, data)=>{
            if(err){
                console.log(err);
            }
            else{
                
                Promise.all([Author.updateOne({ _id: req.body.authorId}, {
                    $push:{
                        books: data._id
                    }
                }),
                    Publisher.updateOne({ _id: req.body.publisherId}, {
                        $push:{
                            books: data._id
                        }
                    })
                ]);

                res.status(200).json({
                    message: data
                })
            }
        });
      
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Book Saving Failed'
        })
    }


});

//post multiple books
adminRoute.post('/all', (req, res)=>{

});


//post one author
adminRoute.post('/author', async (req, res)=>{

    const newAuthor = new Author({
        ...req.body
    });

    try{
        await newAuthor.save();
        res.status(200).json({
            message: 'Author Successfully Saved'
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Author Saving Failed'
        });
    }
});

adminRoute.post('/pub', async (req, res)=>{

    const publisherNew = new Publisher({
        ...req.body,
        books:[]
    });

    try{
        await publisherNew.save();
        res.status(200).json({
            message: 'Pub Successfully Saved'
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Pub Saving Failed'
        });
    }
});


module.exports = adminRoute;
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const authorRouter = express.Router();



//get all books
authorRouter.get('/',(req, res)=>{

});


//get only one author
authorRouter.get('/:id', (req, res)=>{

});


module.exports = authorRouter;
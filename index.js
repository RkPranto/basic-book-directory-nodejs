const express = require('express');
const mongoose = require('mongoose');
const app = express();

const adminRoute = require('./routerHandlers/adminRoute');
const bookDirRoute = require('./routerHandlers/bookdirRoute');


//connect mongoose
mongoose.connect('mongodb://localhost/bookdirectory',{ useUnifiedTopology: true, useNewUrlParser: true })
.then(()=>{
        console.log("Connected Successfully");
    }
)
.catch((err)=>{
    console.log(err);
});


app.use(express.json());
app.use('/admin', adminRoute);
app.use('/', bookDirRoute);


app.listen(3000, ()=>{
    console.log("express app started listening");
})





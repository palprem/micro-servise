const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");

require("./Books");
const Books = mongoose.model("Books");

mongoose.connect("mongodb+srv://dbUser:prem@123@cluster0.nmk1b.mongodb.net/<dbname>?retryWrites=true&w=majority", (req, res)=>{
    if(!res){
    console.log("DATABASE is Connected!");
        
    }else{
    console.log("DATABASE not Connected!");

    }
});

app.get('/book', (req, res) =>{
    res.send('this is books service!');
});

app.post("/book", (req, res) =>{
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher,
    }

    var book = new Books(newBook)

    book.save().then(() =>{
        console.log("New book created!");
    }).catch((err) =>{
        if(err){
            throw err;
        }
    });
    res.send("A new book created!");
    
});
app.get("/book", (req, res) => {
    Books.find().then((book) =>{
        res.json(book);
    }).catch(err =>{
        if(err){
            throw err;
        }

    });
});


app.get("/book/:id", (req, res)=>{
    res.send(req.params.id)
});

app.listen(4545, () =>{
    console.log('Up and running!...... this is books service');
});
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const { response } = require("express");

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://dbUser:prem@123@cluster0.nmk1b.mongodb.net/<dbname>?retryWrites=true&w=majority ", ()=>{
    console.log("databae connected!")
});

require("./Order");
const Order = mongoose.model("Order");


app.post("/order", (req, res)=>{
    var newOrder = {
        BuyerID: mongoose.Types.ObjectId(req.body.BuyerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initalDate: req.body.initalDate
    }
    var newOrder = new Order(newOrder);
    Order.save().then(()=>{
        console.log("order success!");
    }).catch((err)=>{
        if(err){
            throw err
        }
    });
});

app.get("/order",(req, res)=>{
    Order.find().then((book)=>{
        res.json(book)
    }).catch((err)=>{
        if(err){
            throw err
        }
    });
});

app.get("/order/:id", (req, res)=>{
    Order.findById(req.params.id).then((order)=>{
        if(order){
            axios.get("http://localhost:5555/buyer/", order.BuyerID).then((response)=>{
                var orderObject = { buyerName: response.data.name, bookTitle: ''}

                axios.get("http//localhost:4545/book/", order.BookID).then((response)=>{
                    orderObject.bookTitle = response.data.title
                    res.json(orderObject)
                });

            });
            res.send("fast responce");
        }else{
            res.send("Invalid Order!");
        }
    });  
});


app.listen(7777, ()=>{
    console.log("order!");
});
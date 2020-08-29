const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://dbUser:prem@123@cluster0.nmk1b.mongodb.net/<dbname>?retryWrites=true&w=majority", ()=>{
    console.log("Dtabase connected");
});

require("./Buyers");
const Buyers =mongoose.model("Buyers");


app.get("/buyer", (req, res)=>{
    Buyers.find().then((buyer)=>{
        res.json(buyer);
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
})

app.get("/buyer/:id", (req, res)=>{
    Buyers.findById(req.params.id).then((buyer)=>{
        if(buyer){
            res.json(buyer);
        }else{
            res.send("false Id");
        }
    }).catch((err)=>{
        if(err){
            throw err
        }
    });
});

app.delete("/buyer/:id", (req, res)=>{
    Buyers.findByIdAndRemove(req.params.id).then(()=>{
        res.send("deleting success!");
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
})

app.post("/buyer", (req, res)=>{

    var newBuyers={
        name: req.body.name,
        age: req.body.age,
        addres: req.body.addres
    }
    var newBuyers = new Buyers(newBuyers);
    
    buyer.save().then(()=>{
        res.send("buyers is created")
    }).catch((err)=>{
        if(err){
            throw err
        }
    
    });
});

app.listen("5555", ()=>{
    console.log("Up and running buyer service");
});
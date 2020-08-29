const mongoose = require("mongoose");
mongoose.model('Buyers', {
    name:{
        type: String,
        require: true
    },
    age: {
        type: String,
        require:true
    },
    address:{
        type: String,
        require: true
    }
});
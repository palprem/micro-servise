const mongoose = require("mongoose");

mongoose.model("Books", {
    title:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    numberPages: {
        type: Number,
        require: false
    },
    publishey:{
        title: String,
        require: false
    },
});
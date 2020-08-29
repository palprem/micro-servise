const { mongo } = require("mongoose");

const mongoose = require("mongoose");
mongoose.model("Orders", {
    OrederID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true

    },
    OrederID:{
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    OrderDATA:{
        type:Date,
        require: true

    },
    DeliveryDate: Date,
    require: true

});
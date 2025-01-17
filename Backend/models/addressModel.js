const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
    state:{
        type:String,
        
    },

    city:{
        type:String,
    },

    zip:{
        type:Number,
    },

    address:{
        type:String,
    },

    ref :{
        type:mongoose.Schema.Types.ObjectId, 
        ref: "user"
    }
},{
    timestamps:true
});

module.exports = mongoose.model("address",addressSchema);

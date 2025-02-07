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

    addressType:{
        type:String,
        enum:["default","home", "office"]
    },

    selected:{
        type:Boolean,
        default:false,
        
    },

    ref :{
        type:mongoose.Schema.Types.ObjectId, 
        ref: "user"
    }
},{
    timestamps:true
});

module.exports = mongoose.model("address",addressSchema);

const mongoose = require("mongoose");


const wishListSchema = mongoose.Schema({
    
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            },

            productId:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:"products"
            }]
    
});


const wishListModel = mongoose.model("whishList",wishListSchema);

module.exports = wishListModel;
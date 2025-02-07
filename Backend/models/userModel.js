const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({

    fullname:{
        firstname:{
            type:String,
            required:true,
            trim:true,
        },

        lastname:{
            type:String,
            trim:true,
        }
        
    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:[6, "Please enter email length above 6 character"]
    },


    password:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:[6, "Please enter lenghtg of password above 6 character"]
    },

    image:{
        type:String,
        
    },

    mobile:{
        type:Number,
        unique:true,
        minLength:[10,"Please enter proper 10 digits mobile number"],

    },

    isverified:{
        type:Boolean,
        default:false,

    },

    accountactive:{
        type:Boolean,
        default:false,

    },

    emailtoken:{
        type:String,
        
    },

    otp:{
        type:Number,
        minLength:6,
        maxLength:6,
        expires:600,
    },

    order:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "order",
        },
      ],

    cart: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
      ],

},{timestamps:true}
);



userSchema.statics.hashPassword = function(password){
 const hash = bcrypt.hash(password,10)
 return hash
}


userSchema.methods.authUser = function(){
   const token = jwt.sign({_id:this._id},process.env.JWT_SECRET)
   return token;
}

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
}



const userModel = mongoose.model("user",userSchema);
module.exports = userModel;

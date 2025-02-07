const mongoose = require("mongoose")

//blacklisted schema for logout rout

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        uniqe:true
    },

    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400
    }
})

module.exports = mongoose.model("blacklisttoken", blacklistTokenSchema);
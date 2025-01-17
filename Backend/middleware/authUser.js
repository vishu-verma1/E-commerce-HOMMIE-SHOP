const cookieParser = require("cookie-parser")
const userModel = require("../models/userModel")
const dotenv = require("dotenv")
dotenv.config();
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")


module.exports.isLogin = async function(req,res,next){
 
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log(token)

    if(!token){
        res.status(401).json({message:"Unauthrized access"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        // console.log(user)
        req.user = user;
        return next();
    }catch(err){
        return res.status(401).json({message:"unauthrized"})
    }
    
    
}




module.exports.sendMail = async (email, emailToken,req,res)=>{

    const transporter = nodemailer.createTransport({
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
    });

    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: email,  
        subject: "sending email using node.js",
        text: `Hey welcome and this is your confirmaiton link `,
        html: `<a href="http://localhost:5173/verify-email?emailToken=${emailToken}">Click here to verify</a>`
      };



      transporter.sendMail(mailOptions, (err, info) => {
        if (!err) {
            userModel.findOneAndUpdate({email},{accountactive:true})
        return res.status(200).json({ meesage: "Email sent", info });
        } 
        else {
            
        return res.status(401).json({ error: err, message: "Mail Box is Unavailable" });
        }
      });

}
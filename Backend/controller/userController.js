const userModel = require("../models/userModel");
const userService = require("../services/userService");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const dotenv = require("dotenv");
const { sendMail } = require("../middleware/authUser");
const wishListModel = require("../models/wishListModel");
dotenv.config();

module.exports.signUpController = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = "This routes used to register new user"
  // #swagger.description = "description of routes"

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      fullname,
      email,
      password,
      image,
      mobile,
      isverified,
      emailtoken,
      otp,
      accountactive,
    } = req.body;

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(401).json({ message: "User already exist" });
    }

    const hash = await userModel.hashPassword(password);
    const emailToken = await userModel.hashPassword(email);

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hash,
      image,
      mobile,
      isverified,
      otp,
      emailtoken: emailToken,
      accountactive,
    });

    user.save();

    const token = user.authUser();

    //sending mail for confirmation
    sendMail(email, emailToken);

    res.status(200).json({ token: token, message: "user added successfuly" });
  } catch (err) {
    res.status(200).json({ message: err.message, token: null });
  }
};

module.exports.emailTokenVerification = async (req, res) => {
  // #swagger.tags = ['Users']

  const { token } = req.params;

  if (!token) {
    return res.status(401).json({ message: "Unauthrized" });
  }

  // const user = userModel.find({_id:req.user._id});
  // console.log(user)
  // console.log(token)

  if (req.user.emailtoken == token) {
    req.user.accountactive = true;
    req.user.save();
    return res.status(200).json({ message: "account is active now" });
  }

  res.status(401).json({ message: "somthing went wrong" });
};

module.exports.loginController = async (req, res) => {
  // #swagger.tags = ['Users']

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email }).select("+password");

  if (!user) {
    return res.staus(401).json({ message: "invalid email and password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "invalid email and password" });
  }

  const token = user.authUser();

  return res.status(200).json({ user, token });
};

module.exports.sendMailController = async (req, res) => {
  // #swagger.tags = ['Users']
  /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
  //OTP GENRATION\

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const { email } = req.user;
  await userModel.findOneAndUpdate({ email }, { otp: otp });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSKEY,
    },
  });

  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email, //"svagproductions@gmail.com",
    subject: "sending email using node.js",
    text: `Hey welcome and this is your OTP Code ${otp} `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(550).json({ error: err, message: "Mail Box is Unavailable" });
    } else {
      res.status(200).json({ meesage: "Email sent", info });
    }
  });
};

module.exports.otpVerifyController = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const user = await userModel.findOne({ email: req.user.email });

    if (!user) {
      res.status(401).json({ message: "Unauthrized" });
    }

    const { otp } = req.body;

    if (otp != req.user.otp) {
      res.status(401).json({ message: "OTP is incorrect" });
    } else {
      await userModel.updateOne({ email: user.email }, { isverified: true });
      res.status(200).json({ message: "OTP matched and user verified" });
    }
  } catch (err) {
    res.status(401).json({ error: err, message: "Unauthrized" });
  }
};

module.exports.forgotpassController = async (req, res) => {
  // #swagger.tags = ['Users']

  const { email } = req.user;

  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  // it will set null value of otp field in database after 10 minuts

  setTimeout(async () => {
    otp = null;
    await userModel.findOneAndUpdate({ email }, { otp: otp });
  }, 6000);

  await userModel.findOneAndUpdate({ email }, { otp: otp });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSKEY,
    },
  });

  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "sending email using node.js",
    text: `Hey welcome and this is your OTP Code ${otp} `,
    html: `<h1>reset link </h1>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(550).json({ error: err, message: "Mail Box is Unavailable" });
    } else {
      res.status(200).json({ meesage: "Email sent", info });
    }
  });
};

module.exports.passwordResetController = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const user = await userModel.findOne({ email: req.user.email });

    if (!user) {
      res.status(401).json({ message: "Unauthrized" });
    }

    const { otp } = req.body;

    if (!otp && otp != req.user.otp) {
      res.status(401).json({ message: "OTP is incorrect" });
    } else if (otp == req.user.otp) {
      await userModel.updateOne({ email: user.email }, { isverified: true });
      res.status(200).json({ message: "OTP matched and user verified" });
    } else {
      res.status(401).json({ message: "OTP is expired please try again" });
    }
  } catch (err) {
    res.status(401).json({ error: err, message: "Unauthrized" });
  }
};

module.exports.passwordUpdatetController = async (req, res) => {
  // #swagger.tags = ['Users']

  const error = validationResult(req);
  if (!error.isEmpty) {
    return res.status(400).json({ error: error.array() });
  }
  const { email } = req.user;
  const user = await userModel.findOne({ email });
  //  console.log(user)

  const { oldpassword, newpassword, confirmpassword } = req.body;

  const isMatch = await user.comparePassword(oldpassword);

  if (!isMatch) {
    return res.status(401).json({ message: "invalid old password" });
  }

  if (newpassword != confirmpassword) {
    return res
      .status(401)
      .json({ message: "new password and confirm password does not match" });
  }

  const hash = await userModel.hashPassword(confirmpassword);

  user.password = hash;
  user.save();

  return res.status(200).json({ message: "password updated" });
};

module.exports.addressController = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const { state, city, zip, address } = req.body;

    const add = await userService.addAddress({
      state,
      city,
      zip,
      address,
      ref: req.user._id,
    });

    add.save();

    res.status(200).json({ message: "address is added to the profile" });
  } catch (err) {
    res
      .status(401)
      .json({ error: err.array(), message: "somthing went wrong" });
  }
};

module.exports.profilePicController = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.consumes = ['multipart/form-data']
  // #swagger.parameters = [{"name": "image","in": "formData","type": "file","description":"Choose profile pic", "x-mimetype":"application/image" }

  try {
    const user = await userModel.findOne({ email: req.user.email });
    user.image = req.file.path;
    user.save();
    res.status(200).json({ message: "profile picture changed" });
  } catch (err) {
    res.status(401).json({ error: err, message: "something went wrong" });
  }
};

module.exports.addToCartController = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const user = await userModel.find({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();

    res.status(200).json({ message: "your product is added to cart" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.addToWishListController = async (req, res) => {
  try {
    const productid = req.params.productid;
    const userid = req.user._id;
    const wishListexist = await wishListModel.find({produtId:productid});
    if(wishListexist){
      return res.status(400).json({message:"Product is already in your wishlist"})
    }

    const wishProduct = await userService.createAddToWishList({
      userid,
      productid
    })

    res.status(200).json({wishProduct, message:"your product is added to your wishlist"})
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const userModel = require("../models/userModel");
const fs = require("fs");
const path = require("path");
const userService = require("../services/userService");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const dotenv = require("dotenv");
const { sendMail } = require("../middleware/authUser");
const wishListModel = require("../models/wishListModel");
const blackListedModel = require("../models/blackListedModel");
const addressModel = require("../models/addressModel");
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
      mobile,
      isverified,
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
      mobile,
      isverified,
      otp,
      emailtoken: emailToken,
      accountactive,
    });

    user.save();

    const token = user.authUser();

    //sending mail for confirmation
    // sendMail(email, emailToken,req,res);

    res.status(201).json({ user, token, message: "user added successfuly" });
  } catch (err) {
    res.status(401).json({ message: err.message, token: null });
  }
};

module.exports.updateController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, mobile, email } = req.body;
    const user = await userModel.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fullname) {
      user.fullname.firstname = fullname.firstname || user.fullname.firstname;
      user.fullname.lastname = fullname.lastname || user.fullname.lastname;
    }

    if (mobile) {
      user.mobile = mobile;
    }

    if (email) {
      user.email = email;
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal Server Error" });
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
    return res.status(401).json({ message: "invalid email and password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "invalid email and password" });
  }

  const token = user.authUser();

  return res.status(201).json({ user, token });
};

module.exports.logoutController = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blackListedModel.create({ token });
  res.clearCookie("token");

  res.status(200).json({ message: "Logged Out" });
};

module.exports.getUserProfileController = async (req, res, next) => {
  res.status(200).json(req.user);
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

  const { newpassword, confirmpassword } = req.body;

  // const isMatch = await user.comparePassword(oldpassword);

  // if (!isMatch) {
  //   return res.status(401).json({ message: "invalid old password" });
  // }

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
    const { state, city, zip, address, addressType } = req.body;

    const addressCount = await addressModel.countDocuments({
      ref: req.user._id,
    });
    if (addressCount >= 5) {
      return res
        .status(400)
        .json({ message: "You cannot add more than 5 addresses" });
    }

    if (addressType === "default") {
      const defaultAddress = await addressModel.findOne({
        ref: req.user._id,
        addressType: "default",
      });
      if (defaultAddress) {
        return res
          .status(400)
          .json({ message: "You already have a default address" });
      }
    }

    const add = await userService.addAddress({
      state,
      city,
      zip,
      address,
      addressType,
      ref: req.user._id,
    });

    add.save();

    res.status(200).json({ message: "Address is added to the profile" });
  } catch (err) {
    res
      .status(401)
      .json({ error: err.message, message: "Something went wrong" });
  }
};

module.exports.updateAddressController = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const { addressId, state, city, zip, address, addressType, selected } =
      req.body;

    const addressToUpdate = await addressModel.findOne({
      _id: addressId,
      ref: req.user._id,
    });

    if (!addressToUpdate) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (
      addressType === "default" &&
      addressToUpdate.addressType !== "default"
    ) {
      const defaultAddress = await addressModel.findOne({
        ref: req.user._id,
        addressType: "default",
      });
      if (defaultAddress) {
        return res
          .status(400)
          .json({ message: "You already have a default address" });
      }
    }

    if (selected) {
      await addressModel.updateMany(
        { ref: req.user._id, _id: { $ne: addressId } },
        { selected: false }
      );
    }

    addressToUpdate.state = state || addressToUpdate.state;
    addressToUpdate.city = city || addressToUpdate.city;
    addressToUpdate.zip = zip || addressToUpdate.zip;
    addressToUpdate.address = address || addressToUpdate.address;
    addressToUpdate.addressType = addressType || addressToUpdate.addressType;
    addressToUpdate.selected = selected;

    await addressToUpdate.save();

    res.status(200).json({ message: "Address updated successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message, message: "Something went wrong" });
  }
};

module.exports.getAddressController = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const addresses = await addressModel.find({ ref: req.user._id });

    if (!addresses || addresses.length === 0) {
      return res.status(200).json({ message: "No addresses found" });
    }

    res
      .status(200)
      .json({ addresses, message: "Addresses fetched successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message, message: "Something went wrong" });
  }
};

module.exports.profilePicController = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.consumes = ['multipart/form-data']
  // #swagger.parameters = [{"name": "image","in": "formData","type": "file","description":"Choose profile pic", "x-mimetype":"application/image" }

  try {
    if (req.user.image) {
      const oldImagePath = path.resolve(__dirname, "../..", req.user.image);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    req.user.image = req.file.path;
    req.user.save();
    res.status(200).json({ message: "profile picture changed" });
  } catch (err) {
    res.status(401).json({ error: err, message: "something went wrong" });
  }
};

module.exports.addToCartController = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.cart) {
      user.cart = [];
    }

    const productId = req.params.productid;
    if (user.cart.includes(productId)) {
      return res
        .status(400)
        .json({ message: "Product is already in the cart" });
    }

    user.cart.push(productId);
    await user.save();

    res.status(200).json({ message: "Your product is added to cart" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.removeCartListController = async (req, res) => {
  try {
    const productId = req.params.productid;
    const userId = req.user._id;

   
    const user = await userModel.findOne({ _id: userId });
   
    const productIndex = user.cart.indexOf(productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    
    user.cart.splice(productIndex, 1);
    await user.save();
    const users = await userModel.findOne({ _id: userId });
  
    console.log("removeCArtlist");
    
    res.status(200).json({ message: "Product removed from cart" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.addToWishListController = async (req, res) => {
  try {
    const productId = req.params.productid;
    const userId = req.user._id;

    let wishListExist = await wishListModel.findOne({ userId });

    if (wishListExist) {
      if (wishListExist.productId.includes(productId)) {
        return res
          .status(200)
          .json({ message: "Product is already in your wishlist" });
      }

      wishListExist.productId.push(productId);
      wishListExist.save();
      return res
        .status(200)
        .json({ message: "Your product is added to your wishlist" });
    } else {
      const wishProduct = await userService.createAddToWishList({
        userId,
        productId,
      });
      res
        .status(200)
        .json({ message: "Your product is added to your wishlist" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.getCartListController = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");    
    res.status(200).json({ cart: user.cart, message: "your list" });
    console.log("getCArtlist")
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.getWishListController = async (req, res) => {
  try {
    const wishList = await wishListModel
      .findOne({ userId: req.user._id })
      .populate("productId");
      if(wishList){

        return res.status(200).json({ wishList, message: "your list" });
      }
      return res.status(200).json({ message: "wishlist is empty" });
      
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.removeWishListController = async (req, res) => {
  try {
    const productId = req.params.productid;
    const userId = req.user._id;

    
    const wishList = await wishListModel.findOne({ userId });

    if (!wishList) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    
    const productIndex = wishList.productId.indexOf(productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

   
    wishList.productId.splice(productIndex, 1);
    await wishList.save();

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
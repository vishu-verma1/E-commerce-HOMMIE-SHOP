const addressModel = require("../models/addressModel");
const userModel = require("../models/userModel");
const wishListModel = require("../models/wishListModel")

module.exports.createUser = async ({firstname, lastname,email, password, image,mobile, emailtoken,isverified,otp,}) => {



  if(!firstname ||!email || !password){
    throw new Error("Please fill all the fields");
}
    

  const user = await userModel.create({
    fullname :{
        firstname,
        lastname,
    },
    email,
    password,
    image,
    mobile,
    isverified,
    otp,
    emailtoken,
  });

   
  return user;

 

};

module.exports.addAddress = async({state, city, zip, address,ref}) =>{

  const addressCreated = await addressModel.create({
    state,
    city,
    zip,
    address,
    ref
  });

  return addressCreated;
}


module.exports.createAddToWishList = async({userid, productid}) =>{
  
 const wishList = await wishListModel.create({
    userId:userid,
    productId:productid
  });
  return wishList;
}
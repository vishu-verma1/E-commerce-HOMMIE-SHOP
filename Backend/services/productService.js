const productModel = require("../models/productModel");

module.exports.productCreate = async ({productname, price, productimages, quantity, refid, category, description }) => {
    if(!productname|| !price|| !productimages || !quantity || !description){
        throw new Error("All field are required")
    }

  

 const product =  await productModel.create({
    productname,
    price,
    productimages,
    quantity,
    refid,
    category,
    description
  });

  return product;
};
